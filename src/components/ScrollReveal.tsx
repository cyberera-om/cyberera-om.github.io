import type { ReactNode } from 'react'
import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
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
  offset,
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
  /** Custom useScroll offset; default tuned for “slide in from sides”. */
  offset?: NonNullable<Parameters<typeof useScroll>[0]>['offset']
  style?: MotionStyle
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  // If reduced motion is enabled, keep layout identical without scroll-driven transforms.
  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const { scrollYProgress } = useScroll({
    target: ref,
    // Progress goes 0→1 as the element moves through the viewport; reversing on scroll-up “just works”.
    // Tuned to “snap in” sooner and feel like cards quickly join the layout.
    offset: offset ?? ['start 0.98', 'end 0.62'],
  })

  const sign = from === 'right' ? 1 : -1

  const xRaw =
    from === 'left' || from === 'right'
      ? useTransform(scrollYProgress, [0, 1], [sign * distance, 0])
      : undefined

  const yRaw =
    from === 'bottom' ? useTransform(scrollYProgress, [0, 1], [distance, 0]) : undefined

  const opacityRaw = useTransform(scrollYProgress, [0, 0.12, 1], [0, 1, 1])
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [0.985, 1])
  const rotateRaw = rotate ? useTransform(scrollYProgress, [0, 1], [rotate, 0]) : undefined

  // Smooth all transforms so they feel “premium” and not jittery.
  const spring = { stiffness: 280, damping: 24 }
  const x = xRaw ? useSpring(xRaw, spring) : undefined
  const y = yRaw ? useSpring(yRaw, spring) : undefined
  const opacity = useSpring(opacityRaw, spring)
  const scale = useSpring(scaleRaw, spring)

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{
        ...style,
        x,
        y,
        opacity,
        scale,
        rotate: rotateRaw,
      }}
    >
      {children}
    </motion.div>
  )
}
