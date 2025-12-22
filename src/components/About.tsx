import { motion } from 'framer-motion'
import { BadgeCheck, Lightbulb, Target, Handshake } from 'lucide-react'
import { Container } from './Container'
import { ParallaxCard } from './ParallaxCard'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'
import { useScrollParallax } from '../lib/parallax'

const cards = [
  {
    title: 'Our Vision',
    icon: Lightbulb,
    text: 'To be a trusted global partner for cybersecurity, training, and secure digital delivery.',
  },
  {
    title: 'Our Mission',
    icon: Target,
    text: 'To protect, train, and enable—through practical services and secure solutions.',
  },
  {
    title: 'What We Do',
    icon: BadgeCheck,
    text: 'We assess risk, secure systems, monitor threats, and build capability your team can apply immediately.',
  },
  {
    title: 'Core Values',
    icon: Handshake,
    text: 'Integrity • Trust • Security-first mindset • Quality • Continuous learning',
  },
] as const

export function About() {
  const orbA = useScrollParallax({ distance: 110 })
  const orbB = useScrollParallax({ distance: 70 })
  return (
    <section id="about" className="relative py-20 sm:py-24">
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
          eyebrow="ABOUT CYRA"
          title="Security. Skills. Delivery."
          description="We help organization reduce risk, train talent, and ship secure digital products—fast, practical, and measurable."
        />

        <div className="mt-12 grid gap-3 md:grid-cols-2">
          {cards.map((c, i) => {
            const Icon = c.icon
            const from = i % 2 === 0 ? 'left' : 'right'
            return (
              <ScrollReveal
                key={c.title}
                from={from}
                distance={64}
                className="[perspective:900px]"
              >
                <ParallaxCard className="glass rounded-3xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-cyra-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-extrabold">{c.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-200">{c.text}</p>
                </ParallaxCard>
              </ScrollReveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
