import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function Button({ className, variant = 'primary', ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all',
        'disabled:opacity-60 disabled:pointer-events-none',
        variant === 'primary' &&
          'bg-cyra-500 text-ink-950 shadow-glow hover:bg-cyra-400 active:bg-cyra-600',
        variant === 'secondary' &&
          'glass text-ink-50 hover:bg-white/10 active:bg-white/15',
        variant === 'ghost' &&
          'text-ink-100 hover:bg-white/10 active:bg-white/15',
        className,
      )}
      {...props}
    />
  )
}
