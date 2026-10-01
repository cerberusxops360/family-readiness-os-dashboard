import Stripe from 'stripe'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_build_placeholder')
const resend = new Resend(process.env.RESEND_API_KEY ?? 'build_placeholder')
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'hello@pointman360.com'
const NOTION_TEMPLATE_URL = process.env.NOTION_TEMPLATE_URL ?? ''

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    console.error('Stripe webhook misconfigured: missing signature header or STRIPE_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const rawBody = await request.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.error('Stripe webhook signature verification failed', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_details?.email

    if (!email) {
      console.error('Checkout session completed with no customer email', session.id)
      return NextResponse.json({ received: true })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('Cannot send delivery email: missing RESEND_API_KEY')
      return NextResponse.json({ received: true })
    }

    try {
      const { error } = await resend.emails.send({
        from: `Pointman360 <${FROM_EMAIL}>`,
        to: email,
        subject: 'Your Family Readiness OS template',
        text: [
          'Thanks for your purchase!',
          '',
          'Open the link below, then click "Duplicate" in the top right to add Family Readiness OS to your own Notion workspace:',
          '',
          NOTION_TEMPLATE_URL || '(template link pending setup - contact hello@pointman360.com and we will send it right over)',
          '',
          'Questions or issues duplicating it? Just reply to this email.',
          '',
          '-- Pointman360',
        ].join('\n'),
      })

      if (error) {
        console.error('Resend delivery email failed', error)
      }
    } catch (err) {
      console.error('Unexpected delivery email error', err)
    }
  }

  return NextResponse.json({ received: true })
}


