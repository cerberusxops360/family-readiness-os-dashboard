'use client'

import { useActionState, useId } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { joinWaitlist, type WaitlistState } from '@/app/actions'
import { cn } from '@/lib/utils'

const initialState: WaitlistState = { status: 'idle', message: '' }

type WaitlistFormProps = {
  className?: string
  cta?: string
  hint?: string
  items?: string[]
  onSubmitted?: () => void
}

export function WaitlistForm({
  className,
  cta = 'Join release notes',
  hint = 'Launch notice with 25% off, then occasional release notes. Unsubscribe anytime.',
  items,
  onSubmitted,
}: WaitlistFormProps) {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState)
  const id = useId()

  if (state.status === 'success') {
    return (
      <div role="status" className={cn('flex items-center gap-3 rounded-md border border-info/40 bg-info/10 p-4 text-sm', className)}>
        <CheckCircle2 className="size-5 shrink-0 text-info" aria-hidden="true" />
        <p>{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} onSubmit={onSubmitted} className={cn('w-full', className)} noValidate>
      {items?.length ? <input type="hidden" name="items" value={items.join(',')} /> : null}
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@family.com"
          aria-invalid={state.status === 'error'}
          aria-describedby={`${id}-msg`}
          className="h-12 min-w-0 flex-1 rounded-md border bg-card px-3 text-base outline-none placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 sm:text-sm"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60"
        >
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          {pending ? 'Submitting' : cta}
          {!pending && <ArrowRight className="size-4" aria-hidden="true" />}
        </button>
      </div>
      <p
        id={`${id}-msg`}
        aria-live="polite"
        className={cn('mt-2 text-xs leading-relaxed', state.status === 'error' ? 'text-destructive' : 'text-muted-foreground')}
      >
        {state.status === 'error' ? state.message : hint}
      </p>
    </form>
  )
}
