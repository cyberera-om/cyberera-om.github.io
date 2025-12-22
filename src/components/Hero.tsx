import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, GraduationCap } from 'lucide-react'
import { fadeUp, stagger } from '../lib/motion'
import { Button } from './Button'
import { Container } from './Container'
import { ParallaxCard } from './ParallaxCard'

const slides = [
  {
    image: '/images/bg_1.jpg',
    eyebrow: 'Cybersecurity, Professional Training & Digital Solutions',
    title: 'Secure. Future‑ready. Built to last.',
    cta: { label: 'Explore Services', href: '#services' },
    icon: ShieldCheck,
  },
  {
    image: '/images/bg_2.jpg',
    eyebrow: 'Cybersecurity Services',
    title: 'Stay ahead of evolving cyber threats.',
    cta: { label: 'Request Consultation', href: '#contact' },
    icon: Sparkles,
  },
  {
    image: '/images/bg_3.jpg',
    eyebrow: 'Professional & Corporate Training',
    title: 'Build skills teams can use on day one.',
    cta: { label: 'Request Consultation', href: '#contact' },
    icon: GraduationCap,
  },
] as const

function scrollToHash(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  const heroRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })

  const bgDistance = reduceMotion ? 0 : 90
  const gridDistance = reduceMotion ? 0 : 55
  const orbDistance = reduceMotion ? 0 : 120

  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [-bgDistance, bgDistance]), {
    stiffness: 120,
    damping: 24,
  })
  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], [-gridDistance, gridDistance]), {
    stiffness: 120,
    damping: 24,
  })
  const orbY = useSpring(useTransform(scrollYProgress, [0, 1], [-orbDistance, orbDistance]), {
    stiffness: 120,
    damping: 24,
  })

  const active = slides[index]
  const Icon = active.icon

  useEffect(() => {
    if (reduceMotion) return
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6500)
    return () => window.clearInterval(t)
  }, [reduceMotion])

  const dots = useMemo(() => slides.map((_, i) => i), [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="force-dark relative min-h-screen overflow-hidden pt-20 text-ink-50 flex items-center"
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.image}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -inset-24"
            style={{ y: bgY }}
          >
            <motion.img
              src={active.image}
              alt="CYRA hero background"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/35 via-ink-950/75 to-ink-950" />

        <motion.div
          aria-hidden="true"
          className="absolute -inset-24 opacity-[0.14] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:22px_22px]"
          style={{ y: gridY }}
        />

        {/* Floating accent orb (parallax) */}
        <motion.div
          aria-hidden="true"
          className="absolute -right-24 top-24 h-72 w-72 rounded-full opacity-35"
          style={{
            y: orbY,
            background:
              'radial-gradient(circle at 30% 30%, rgba(249,115,22,0.55), rgba(249,115,22,0.0) 62%)',
          }}
        />
      </div>

      <Container>
        <div className="relative" id="content">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid gap-10 lg:grid-cols-12 lg:items-center"
          >
            <div className="lg:col-span-7">
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-ink-100"
              >
                <Icon className="h-4 w-4 text-cyra-300" />
                <span className="text-ink-200">{active.eyebrow}</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-5 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
              >
                {active.title}
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-pretty text-lg text-ink-200">
                Assess risk. Build securely. Train teams. Deliver with confidence.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash(active.cta.href)
                  }}
                >
                  {active.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#about')
                  }}
                >
                  Learn more
                </Button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3"
              >
                {[
                  { k: 'Security‑first', v: 'Mindset & delivery' },
                  { k: 'Practical training', v: 'Job‑ready skills' },
                  { k: 'Secure products', v: 'Built to scale' },
                ].map((item) => (
                  <div key={item.k} className="[perspective:900px] flex">
                    <ParallaxCard className="glass flex-1 rounded-2xl p-4" intensity={0.9}>
                      <div className="text-sm font-extrabold">{item.k}</div>
                      <div className="mt-1 text-xs text-ink-300">{item.v}</div>
                    </ParallaxCard>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <motion.div variants={fadeUp} className="[perspective:900px]">
                <ParallaxCard className="glass relative overflow-hidden rounded-3xl p-6 shadow-2xl" intensity={1.0}>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyra-500/15 via-transparent to-white/5" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-ink-200">Trusted delivery</div>
                    <div className="mt-1 text-2xl font-extrabold">Secure. Practical. Measurable.</div>
                  </div>
                  <div className="h-11 w-11 rounded-2xl bg-cyra-500/15 text-cyra-300 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[{ n: 'Risk', d: 'Assessments' }, { n: 'Build', d: 'Secure solutions' }, { n: 'Train', d: 'Upskilling' }].map(
                    (s) => (
                      <div key={s.n} className="rounded-2xl border border-white/10 bg-ink-950/40 p-4">
                        <div className="text-sm font-extrabold">{s.n}</div>
                        <div className="mt-1 text-xs text-ink-300">{s.d}</div>
                      </div>
                    ),
                  )}
                </div>

                <div className="mt-6 text-xs text-ink-300">
                  Tip: animations respect <span className="text-ink-100 font-semibold">Reduced Motion</span> settings.
                </div>
                </ParallaxCard>
              </motion.div>

              {!reduceMotion ? (
                <div className="mt-5 flex items-center justify-center gap-2">
                  {dots.map((i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      className={
                        i === index
                          ? 'h-2.5 w-8 rounded-full bg-cyra-400/90'
                          : 'h-2.5 w-2.5 rounded-full bg-white/20 hover:bg-white/30'
                      }
                      onClick={() => setIndex(i)}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>

          <div className="mt-20 pb-6">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  )
}
