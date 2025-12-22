import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../lib/utils'
import { useMouseParallax } from '../lib/parallax'

export function ParallaxCard({
  className,
  children,
  intensity,
}: {
  className?: string
  children: ReactNode
  /** Optional single knob to scale effect (1 = normal). */
  intensity?: number
}) {
  const reduce = useReducedMotion()
  const scale = intensity ?? 1
  const mp = useMouseParallax({
    translate: 14 * scale,
    rotate: 6 * scale,
  })

  return (
    <motion.div
      ref={mp.ref as unknown as React.RefObject<HTMLDivElement>}
      className={cn('relative [transform-style:preserve-3d] will-change-transform', className)}
      style={
        reduce
          ? undefined
          : {
              x: mp.x,
              y: mp.y,
              rotateX: mp.rotateX,
              rotateY: mp.rotateY,
              perspective: 900,
            }
      }
    >
      {/* premium "glare" */}
      {!reduce ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-inherit"
          style={{
            background:
              'radial-gradient(420px circle at var(--gx) var(--gy), rgba(255,255,255,0.12), transparent 55%)',
            // Using CSS vars keeps paint cheap
            ['--gx' as any]: mp.glareX,
            ['--gy' as any]: mp.glareY,
          }}
        />
      ) : null}

      {children}
    </motion.div>
  )
}
