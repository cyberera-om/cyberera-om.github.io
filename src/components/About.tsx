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
    text: "CYRA's vision to become a leading global provider of cybersecurity, professional training, and digital solutions, supporting organisations in building secure, resilient, and future-ready digital capabilities.",
  },
  {
    title: 'Our Mission',
    icon: Target,
    text: "CYRA's mission is to empower organisations and individuals through cybersecurity, professional training, and digital solution.",
  },
  {
    title: 'What We Do',
    icon: BadgeCheck,
    text: 'CYRA enable long-term resilience by assessing needs, implementing robust technologies, monitoring performance and threats, and building practical skills that support sustainable digital capability.',
  },
  {
    title: 'Our Core Values',
    icon: Handshake,
    text: "CYRA's Core Values: Integrity & Trust, Innovation, Quality Excellence, Security-first mindset and Continuous Learning",
  },
] as const

export function About() {
  const orbA = useScrollParallax({ distance: 110 })
  const orbB = useScrollParallax({ distance: 70 })
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
          eyebrow="ABOUT US"
          title="Secure, Resilient, Future-Ready"
          description="CYBER ERA (CYRA) is a global cybersecurity, professional training, and digital solutions company. We combine international best practice with deep technical expertise to support secure, resilient, and future-ready organisations."
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
                className="[perspective:900px] flex"
              >
                <ParallaxCard className="glass flex-1 rounded-3xl p-6 flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-cyra-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-extrabold">{c.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-200 flex-1">{c.text}</p>
                </ParallaxCard>
              </ScrollReveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
