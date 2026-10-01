import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

async function unsubscribe(email: string) {
  if (!email) return false
  const { error } = await resend.contacts.update({ email, unsubscribed: true })
  if (error) {
    console.error('Resend unsubscribe failed', error)
    return false
  }
  return true
}

// RFC 8058 one-click unsubscribe: mail clients POST here directly, no page view.
export async function POST(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email') ?? ''
  const ok = await unsubscribe(email)
  return new NextResponse(null, { status: ok ? 200 : 500 })
}

// Fallback for a user clicking the link manually (e.g. from a webmail "unsubscribe" button).
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email') ?? ''
  const ok = await unsubscribe(email)
  return NextResponse.json(
    ok
      ? { status: 'success', message: "You've been unsubscribed." }
      : { status: 'error', message: 'Something went wrong. Try again in a moment.' },
    { status: ok ? 200 : 500 },
  )
}