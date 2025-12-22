import { useEffect, useMemo, useRef } from 'react'
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export type MouseParallaxOptions = {
  /**
   * Max translate in px on each axis.
   * Typical: 10-18.
   */
  translate?: number

  /**
   * Max rotate in degrees (tilt).
   * Typical: 4-8.
   */
  rotate?: number

  /**
   * Spring stiffness.
   */
  stiffness?: number

  /**
   * Spring damping.
   */
  damping?: number
}

export type MouseParallaxResult = {
  ref: React.RefObject<HTMLElement | null>
  x: MotionValue<number>
  y: MotionValue<number>
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  glareX: MotionValue<string>
  glareY: MotionValue<string>
}

/**
 * Mouse-driven parallax (translate + tilt) that stays subtle and premium.
 * Respects OS "reduced motion".
 */
export function useMouseParallax(options?: MouseParallaxOptions): MouseParallaxResult {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const translate = options?.translate ?? 14
  const rotate = options?.rotate ?? 6

  const stiffness = options?.stiffness ?? 180
  const damping = options?.damping ?? 22

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rawRX = useMotionValue(0)
  const rawRY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness, damping })
  const y = useSpring(rawY, { stiffness, damping })
  const rotateX = useSpring(rawRX, { stiffness, damping })
  const rotateY = useSpring(rawRY, { stiffness, damping })

  // Optional "glare" hotspot position (used for a highlight overlay)
  const glareX = useTransform(x, [-translate, translate], ['20%', '80%'])
  const glareY = useTransform(y, [-translate, translate], ['20%', '80%'])

  const api = useMemo(
    () => ({ ref, x, y, rotateX, rotateY, glareX, glareY }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduce) return

    const onMove = (ev: PointerEvent) => {
      if (!ref.current) return
      const r = ref.current.getBoundingClientRect()
      const px = (ev.clientX - r.left) / r.width
      const py = (ev.clientY - r.top) / r.height

      // [-1..1]
      const nx = clamp(px * 2 - 1, -1, 1)
      const ny = clamp(py * 2 - 1, -1, 1)

      rawX.set(nx * translate)
      rawY.set(ny * translate)

      // tilt feels more natural when Y moves rotateX
      rawRX.set(-ny * rotate)
      rawRY.set(nx * rotate)
    }

    const onLeave = () => {
      rawX.set(0)
      rawY.set(0)
      rawRX.set(0)
      rawRY.set(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [damping, reduce, rotate, stiffness, translate, rawRX, rawRY, rawX, rawY])

  return api
}

export type ScrollParallaxOptions = {
  /**
   * Translate distance in px from start to end.
   */
  distance?: number

  /**
   * Scroll offsets for useScroll.
   */
  offset?: NonNullable<Parameters<typeof useScroll>[0]>['offset']
}

/**
 * Scroll-driven Y parallax for a specific element.
 */
export function useScrollParallax(options?: ScrollParallaxOptions) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const distance = options?.distance ?? 60

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options?.offset ?? ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -distance, reduce ? 0 : distance])
  const ySmooth = useSpring(y, { stiffness: 120, damping: 24 })

  return { ref, y: ySmooth }
}
