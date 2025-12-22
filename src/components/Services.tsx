import { motion } from 'framer-motion'
import { Cloud, Code2, GraduationCap, Shield } from 'lucide-react'
import { useScrollParallax } from '../lib/parallax'
import { Container } from './Container'
import { ParallaxCard } from './ParallaxCard'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

const services = [
  {
    title: 'Corporate & Professional Training',
    description:
      'CYRA provides professional and corporate training programmes aligned with global certification standards, combining technical depth with practical, job-ready skills.',
    icon: GraduationCap,
  },
  {
    title: 'Cybersecurity Services',
    description:
      'CYRA provides end-to-end cybersecurity services to identify vulnerabilities, detect threats, and respond effectively to cyber incidents across complex digital environments.',
    icon: Shield,
  },
  {
    title: 'Software Development',
    description:
      'CYRA designs and delivers secure, scalable digital solutions focused on web and mobile application development, business process automation and secure cloud migration to support enterprise growth.',
    icon: Code2,
  },
  {
    title: 'Managed IT & Cloud Services',
    description:
      'CYRA delivers managed IT and cloud services that ensure secure, resilient, and high-performing technology environments through proactive support and continuous monitoring.',
    icon: Cloud,
  },
] as const

export function Services() {
  const accent = useScrollParallax({ distance: 90 })
  const accent2 = useScrollParallax({ distance: 140 })
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
          eyebrow="OUR SERVICES"
          title="Digital Security & Growth"
          description="Cybersecurity, training, and delivery—built for real-world outcomes."
        />

        <div className="mt-12 grid gap-3 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon
            const from = i % 2 === 0 ? 'left' : 'right'
            return (
              <ScrollReveal
                key={s.title}
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
                        <h3 className="text-lg font-extrabold tracking-tight">{s.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-200">{s.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-ink-300">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cyra-400" />
                    Security-first delivery • Clear scope • Measurable results
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
