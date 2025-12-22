import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './Button'
import { Container } from './Container'
import { useScrollParallax } from '../lib/parallax'

export function Consultation() {
  const accent = useScrollParallax({ distance: 100 })
  return (
    <section className="relative py-12 sm:py-14 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_50%_50%,rgba(249,115,22,0.12),transparent_60%)]" />

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        ref={accent.ref as unknown as React.RefObject<HTMLDivElement>}
      >
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{
            y: accent.y,
            background:
              'radial-gradient(circle at 30% 30%, rgba(249,115,22,0.30), rgba(249,115,22,0.0) 62%)',
          }}
        />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl overflow-hidden"
        >
          <div className="relative px-6 py-10 sm:px-10 sm:py-12 text-center">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyra-500/10 via-transparent to-transparent" />
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Professional Consultation
            </h2>
            <p className="mt-4 text-sm sm:text-base text-ink-200 max-w-2xl mx-auto">
              Ready to strengthen your cybersecurity, upskill your team, or accelerate your digital transformation? Let's discuss how CYRA can support your goals.
            </p>
            <div className="mt-6">
              <Button className="group px-6 py-3 text-base">
                Request Consultation
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
