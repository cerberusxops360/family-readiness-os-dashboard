export default function CheckoutSuccessPage() {
  return (
    <main className="mx-auto max-w-lg px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">You&apos;re all set</h1>
      <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
        Check your email for a link to duplicate Family Readiness OS into your own Notion workspace. It should
        arrive within a couple of minutes - if you don&apos;t see it, check spam, or reply to any Pointman360 email
        for help.
      </p>
      <a href="/" className="mt-8 inline-flex text-sm font-medium text-primary underline underline-offset-4">
        Back to home
      </a>
    </main>
  )
}
