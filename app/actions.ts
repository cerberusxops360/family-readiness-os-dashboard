'use server'

import { Resend } from 'resend'

export type WaitlistState = { status: 'idle' | 'success' | 'error'; message: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const resend = new Resend(process.env.RESEND_API_KEY)
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'waitlist@fieldready.co'

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { status: 'error', message: 'Enter a valid email address.' }
  }

  if (!process.env.RESEND_API_KEY || !AUDIENCE_ID) {
    console.error('Resend is not configured: missing RESEND_API_KEY or RESEND_AUDIENCE_ID')
    return { status: 'error', message: 'Signups are temporarily unavailable. Try again shortly.' }
  }

  try {
    // Add to the waitlist audience. Resend returns an error (not a thrown
    // exception with a distinct code) when the contact already exists in
    // this audience, so a repeat signup still counts as success for the user.
    const { error: contactError } = await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    })

    if (contactError && !/already exists/i.test(contactError.message ?? '')) {
      console.error('Resend contact create failed', contactError)
      return { status: 'error', message: 'Something went wrong on our end. Try again in a moment.' }
    }

    // Confirmation email. Failure here should not block the signup itself —
    // the contact is already saved in the audience either way.
    const { error: sendError } = await resend.emails.send({
      from: `Field Ready <${FROM_EMAIL}>`,
      to: email,
      subject: "You're on the Field Ready waitlist",
      text: [
        "You're on the waitlist for Family Readiness OS.",
        '',
        "We'll email you the moment it's ready, with your 25% launch discount already reserved.",
        '',
        '— Field Ready Co.',
      ].join('\n'),
    })

    if (sendError) {
      console.error('Resend confirmation email failed', sendError)
      // Contact is saved; don't surface this as a user-facing error.
    }
  } catch (err) {
    console.error('Unexpected waitlist error', err)
    return { status: 'error', message: 'Something went wrong on our end. Try again in a moment.' }
  }

  return { status: 'success', message: "You're on the list. Your 25% launch discount is reserved." }
}
