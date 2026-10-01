import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_build_placeholder')
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://family-readiness-os-dashboard.vercel.app'

export async function GET(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID) {
    console.error('Checkout misconfigured: missing STRIPE_SECRET_KEY or STRIPE_PRICE_ID')
    return NextResponse.json({ error: 'Checkout is not configured.' }, { status: 500 })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/`,
    })

    if (!session.url) {
      console.error('Stripe checkout session created without a redirect URL', session.id)
      return NextResponse.json({ error: 'Could not start checkout.' }, { status: 500 })
    }

    return NextResponse.redirect(session.url, { status: 303 })
  } catch (err) {
    console.error('Stripe checkout session creation failed', err)
    return NextResponse.json({ error: 'Could not start checkout.' }, { status: 500 })
  }
}

