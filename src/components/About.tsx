import { motion } from 'framer-motion'
import { BadgeCheck, Lightbulb, Target, Handshake } from 'lucide-react'
import { Container } from './Container'
import { ParallaxCard } from './ParallaxCard'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'
import { useScrollParallax } from '../lib/parallax'
import { useI18n } from '../lib/i18n'

const CARD_META = [
  { icon: Lightbulb, titleKey: 'about.card.vision.title', textKey: 'about.card.vision.text' },
  { icon: Target, titleKey: 'about.card.mission.title', textKey: 'about.card.mission.text' },
  { icon: BadgeCheck, titleKey: 'about.card.whatWeDo.title', textKey: 'about.card.whatWeDo.text' },
  { icon: Handshake, titleKey: 'about.card.values.title', textKey: 'about.card.values.text' },
] as const

export function About() {
  const orbA = useScrollParallax({ distance: 110 })
  const orbB = useScrollParallax({ distance: 70 })
  const { t } = useI18n()
  return (
    <section id="about" className="relative py-20 sm:py-24 overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_circle_at_80%_20%,rgba(249,115,22,0.10),transparent_60%)]" />

      {/* Extra parallax accents */}
      <div className="pointer-events-none absolute inset-0 -z-10" ref={orbA.ref as unknown as React.RefObject<HTMLDivElement>}>
        <motion.div
          aria-hidden="true"
          className="absolute -left-28 top-8 h-96 w-96 rounded-full opacity-22"
          style={{
            y: orbA.y,
            background:
              'radial-gradient(circle at 30% 30%, rgba(249,115,22,0.40), rgba(249,115,22,0.0) 62%)',
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10" ref={orbB.ref as unknown as React.RefObject<HTMLDivElement>}>
        <motion.div
          aria-hidden="true"
          className="absolute -right-28 bottom-0 h-96 w-96 rounded-full opacity-18"
          style={{
            y: orbB.y,
            background:
              'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), rgba(255,255,255,0.0) 62%)',
          }}
        />
      </div>

      <Container>
        <SectionHeading
          eyebrow={t('about.eyebrow')}
          title={t('about.title')}
          description={t('about.description')}
        />

        <div className="mt-12 grid gap-3 md:grid-cols-2">
          {CARD_META.map((c, i) => {
            const Icon = c.icon
            const from = i % 2 === 0 ? 'left' : 'right'
            const title = t(c.titleKey)
            return (
              <ScrollReveal
                key={c.titleKey}
                from={from}
                distance={64}
                className="[perspective:900px] flex"
              >
                <ParallaxCard className="glass flex-1 rounded-3xl p-6 flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-cyra-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-extrabold">{title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-200 flex-1">{t(c.textKey)}</p>
                </ParallaxCard>
              </ScrollReveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
