import { motion } from 'framer-motion'
import { Cloud, Code2, GraduationCap, Shield } from 'lucide-react'
import { useScrollParallax } from '../lib/parallax'
import { useI18n } from '../lib/i18n'
import { Container } from './Container'
import { ParallaxCard } from './ParallaxCard'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

const SERVICES_META = [
  { icon: GraduationCap, titleKey: 'services.training.title', textKey: 'services.training.text' },
  { icon: Shield, titleKey: 'services.cyber.title', textKey: 'services.cyber.text' },
  { icon: Code2, titleKey: 'services.dev.title', textKey: 'services.dev.text' },
  { icon: Cloud, titleKey: 'services.it.title', textKey: 'services.it.text' },
] as const

export function Services() {
  const accent = useScrollParallax({ distance: 90 })
  const accent2 = useScrollParallax({ distance: 140 })
  const { t } = useI18n()
  return (
    <section id="services" className="relative py-20 sm:py-24 overflow-x-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        ref={accent.ref as unknown as React.RefObject<HTMLDivElement>}
      >
        <motion.div
          aria-hidden="true"
          className="absolute -left-24 top-10 h-80 w-80 rounded-full opacity-30"
          style={{
            y: accent.y,
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.10), rgba(255,255,255,0.0) 62%)',
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        ref={accent2.ref as unknown as React.RefObject<HTMLDivElement>}
      >
        <motion.div
          aria-hidden="true"
          className="absolute -right-28 top-24 h-[28rem] w-[28rem] rounded-full opacity-22"
          style={{
            y: accent2.y,
            background:
              'radial-gradient(circle at 30% 30%, rgba(249,115,22,0.26), rgba(249,115,22,0.0) 62%)',
          }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -inset-24 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.5)_1px,transparent_0)] [background-size:26px_26px]"
          style={{ y: accent2.y }}
        />
      </div>

      <Container>
        <SectionHeading
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
          description={t('services.description')}
        />

        <div className="mt-12 grid gap-3 md:grid-cols-2">
          {SERVICES_META.map((s, i) => {
            const Icon = s.icon
            const from = i % 2 === 0 ? 'left' : 'right'
            const title = t(s.titleKey)
            return (
              <ScrollReveal
                key={s.titleKey}
                from={from}
                distance={64}
                className="[perspective:900px] flex"
              >
                <ParallaxCard
                  className="group glass relative flex-1 overflow-hidden rounded-3xl p-6 flex flex-col"
                  intensity={1.05}
                >
                  <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(800px_circle_at_20%_0%,rgba(249,115,22,0.18),transparent_60%)]" />

                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyra-500/15 text-cyra-300 border border-white/10">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold tracking-tight">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-200">{t(s.textKey)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-ink-300">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cyra-400" />
                    {t('services.badge')}
                  </div>
                </ParallaxCard>
              </ScrollReveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
