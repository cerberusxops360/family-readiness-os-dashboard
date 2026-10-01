'use client'

import { useActionState, useId } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { joinWaitlist, type WaitlistState } from '@/app/actions'
import { cn } from '@/lib/utils'

const initialState: WaitlistState = { status: 'idle', message: '' }

export function WaitlistForm({ className }: { className?: string }) {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState)
  const id = useId()

  if (state.status === 'success') {
    return (
      <div role="status" className={cn('flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 p-4 text-sm', className)}>
        <CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden="true" />
        <p>{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className={cn('w-full', className)} noValidate>
      <div className="flex flex-col gap-2 rounded-xl border bg-card p-1.5 sm:flex-row">
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
          className="h-11 min-w-0 flex-1 rounded-lg bg-transparent px-3 text-base outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring sm:text-sm"
        />
        <Button type="submit" disabled={pending} className="h-11 rounded-lg px-5 text-sm font-semibold">
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          Reserve 25% off
          {!pending && <ArrowRight className="size-4" aria-hidden="true" />}
        </Button>
      </div>
      <p id={`${id}-msg`} className={cn('mt-2 text-xs', state.status === 'error' ? 'text-destructive' : 'text-muted-foreground')}>
        {state.status === 'error' ? state.message : 'Free waitlist. No spam, one email at launch.'}
      </p>
    </form>
  )
}
