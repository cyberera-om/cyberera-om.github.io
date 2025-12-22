import type { ReactNode } from 'react'
import {
  motion,
  useReducedMotion,
  type MotionStyle,
} from 'framer-motion'
import { cn } from '../lib/utils'

export type ScrollRevealFrom = 'left' | 'right' | 'bottom'

export function ScrollReveal({
  children,
  className,
  from = 'bottom',
  distance = 56,
  rotate = 0,
  style,
}: {
  children: ReactNode
  className?: string
  /** Where the element should come from as you scroll down. */
  from?: ScrollRevealFrom
  /** Travel distance in px when hidden. */
  distance?: number
  /** Optional subtle rotate during reveal (deg). */
  rotate?: number
  style?: MotionStyle
}) {
  const reduce = useReducedMotion()

  // If reduced motion is enabled, keep layout identical without scroll-driven transforms.
  if (reduce) {
    return <div className={className}>{children}</div>
  }

  // NOTE: We intentionally avoid useScroll() here.
  // With custom scroll containers (e.g. OverlayScrollbars), window scroll progress may not change,
  // which can leave elements stuck at opacity: 0.
  const sign = from === 'right' ? 1 : -1
  const hiddenX = from === 'left' || from === 'right' ? sign * distance : 0
  const hiddenY = from === 'bottom' ? distance : 0

  return (
    <motion.div
      className={cn('will-change-transform', className)}
      style={style}
      initial={{
        opacity: 0,
        scale: 0.985,
        x: hiddenX,
        y: hiddenY,
        rotate,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
      }}
      viewport={{
        // Re-animate when scrolling back up.
        once: false,
        // Trigger when a small portion becomes visible.
        amount: 0.18,
        // Slightly early reveal for a “snappy” feel.
        margin: '0px 0px -12% 0px',
      }}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 24,
      }}
    >
      {children}
    </motion.div>
  )
}
