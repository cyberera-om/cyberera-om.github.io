import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, GraduationCap } from 'lucide-react'
import { fadeUp, stagger } from '../lib/motion'
import { useI18n } from '../lib/i18n'
import { cn } from '../lib/utils'
import { Button } from './Button'
import { Container } from './Container'
import { ParallaxCard } from './ParallaxCard'

const SLIDES = [
  {
    image: '/images/bg_1.jpg',
    icon: ShieldCheck,
    eyebrowKey: 'hero.slide1.eyebrow',
    titleKey: 'hero.slide1.title',
    ctaKey: 'hero.slide1.cta',
    href: '#services',
  },
  {
    image: '/images/bg_2.jpg',
    icon: Sparkles,
    eyebrowKey: 'hero.slide2.eyebrow',
    titleKey: 'hero.slide2.title',
    ctaKey: 'hero.slide2.cta',
    href: '#contact',
  },
  {
    image: '/images/bg_3.jpg',
    icon: GraduationCap,
    eyebrowKey: 'hero.slide3.eyebrow',
    titleKey: 'hero.slide3.title',
    ctaKey: 'hero.slide3.cta',
    href: '#contact',
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

  const { t, dir } = useI18n()
  const CtaArrow = dir === 'rtl' ? ArrowLeft : ArrowRight

  const slides = useMemo(
    () =>
      SLIDES.map((s) => ({
        image: s.image,
        icon: s.icon,
        eyebrow: t(s.eyebrowKey),
        title: t(s.titleKey),
        cta: { label: t(s.ctaKey), href: s.href },
      })),
    [t],
  )

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
  const titleHasStops = /[.۔]/.test(active.title)

  useEffect(() => {
    if (reduceMotion) return
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 6500)
    return () => window.clearInterval(t)
  }, [reduceMotion])

  const dots = useMemo(() => slides.map((_, i) => i), [])

  // Preload all hero images for instant transitions
  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new Image()
      img.src = slide.image
    })
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="force-dark relative min-h-screen overflow-hidden pt-20 text-ink-50 flex items-center"
    >
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={active.image}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
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
            <div className={cn('lg:col-span-7', dir === 'rtl' ? 'text-right' : undefined)}>
              <motion.div
                variants={fadeUp}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-ink-100',
                  dir === 'rtl' ? 'flex-row-reverse' : undefined,
                )}
              >
                <Icon className="h-4 w-4 text-cyra-300" />
                <span className="text-ink-200">{active.eyebrow}</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className={cn(
                  'mt-5 text-balance font-extrabold tracking-tight leading-[1.05]',
                  titleHasStops
                    ? 'text-3xl sm:text-4xl lg:text-5xl'
                    : 'text-4xl sm:text-5xl lg:text-6xl',
                )}
              >
                {active.title}
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-pretty text-lg text-ink-200">
                {t('hero.lead')}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className={cn('mt-7 flex w-full flex-wrap items-center gap-3', dir === 'rtl' ? 'justify-start' : undefined)}
              >
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash(active.cta.href)
                  }}
                >
                  {active.cta.label}
                  <CtaArrow className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToHash('#about')
                  }}
                >
                  {t('hero.learnMore')}
                </Button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3"
              >
                {[
                  { k: t('hero.mini1.k'), v: t('hero.mini1.v') },
                  { k: t('hero.mini2.k'), v: t('hero.mini2.v') },
                  { k: t('hero.mini3.k'), v: t('hero.mini3.v') },
                ].map((item) => (
                  <div key={item.k} className="[perspective:900px] flex">
                    <ParallaxCard className="glass flex-1 overflow-hidden rounded-2xl p-4" intensity={0.9}>
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
                    <div className="text-sm font-semibold text-ink-200">{t('hero.trustedEyebrow')}</div>
                    <div className="mt-1 text-2xl font-extrabold">{t('hero.trustedTitle')}</div>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyra-500/15 text-cyra-300">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { n: t('hero.kpi1.n'), d: t('hero.kpi1.d') },
                    { n: t('hero.kpi2.n'), d: t('hero.kpi2.d') },
                    { n: t('hero.kpi3.n'), d: t('hero.kpi3.d') },
                  ].map((s) => (
                    <div key={s.n} className="rounded-2xl border border-white/10 bg-ink-950/40 p-4">
                      <div className="text-sm font-extrabold">{s.n}</div>
                      <div className="mt-1 text-xs text-ink-300">{s.d}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-xs text-ink-300">
                  {t('hero.tip')}{' '}
                  <span className="text-ink-100 font-semibold">{t('hero.tipStrong')}</span>{' '}
                  {t('hero.tipTail')}
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
