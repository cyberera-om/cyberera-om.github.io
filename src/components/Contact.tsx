import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Button } from './Button'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'
import { useScrollParallax } from '../lib/parallax'

function buildMailto({
  to,
  subject,
  body,
}: {
  to: string
  subject: string
  body: string
}) {
  const params = new URLSearchParams({
    subject,
    body,
  })
  return `mailto:${encodeURIComponent(to)}?${params.toString()}`
}

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const orb = useScrollParallax({ distance: 120 })

  const to = 'info@cyra.om'

  const mailtoHref = useMemo(() => {
    const body = [
      `Name: ${name || '-'}`,
      `Email: ${email || '-'}`,
      '',
      message || '-',
    ].join('\n')

    return buildMailto({
      to,
      subject: subject || 'Website enquiry',
      body,
    })
  }, [email, message, name, subject])

  const isValid = useMemo(() => {
    if (!name.trim()) return false
    if (!email.trim() || !email.includes('@')) return false
    if (!message.trim()) return false
    return true
  }, [email, message, name])

  return (
    <section id="contact" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_circle_at_20%_10%,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10" ref={orb.ref as unknown as React.RefObject<HTMLDivElement>}>
        <motion.div
          aria-hidden="true"
          className="absolute -left-28 bottom-0 h-[30rem] w-[30rem] rounded-full opacity-22"
          style={{
            y: orb.y,
            background:
              'radial-gradient(circle at 30% 30%, rgba(249,115,22,0.26), rgba(249,115,22,0.0) 62%)',
          }}
        />
      </div>

      <Container>
        <SectionHeading
          eyebrow="CONTACT"
          title="Talk to CYRA"
          description="Send a quick note—our team replies promptly."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <ScrollReveal from="left" distance={64} className="lg:col-span-5">
              <div className="glass rounded-3xl p-6">
                <h3 className="text-lg font-extrabold">Contact details</h3>
                <div className="mt-5 space-y-4 text-sm text-ink-200">
                  <div className="flex gap-3">
                    <div className="mt-0.5 text-cyra-300">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-ink-100">Address</div>
                      <div>P.O BOX: 121, Postal Code: 312, Muscat, Sultanate of Oman</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-0.5 text-cyra-300">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-ink-100">Phone</div>
                      <a className="hover:text-white" href="tel:+96876886668">
                        +968 7688 6668
                      </a>
                      <div className="mt-1">
                        <a className="hover:text-white" href="tel:+96891905008">
                          +968 9190 5008
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-0.5 text-cyra-300">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-ink-100">Email</div>
                      <a className="hover:text-white" href="mailto:info@cyra.om">
                        info@cyra.om
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                  <iframe
                    title="Map"
                    src="https://maps.google.com/maps?width=100%25&height=450&hl=en&q=Muscat,%20Oman&t=&z=12&ie=UTF8&iwloc=B&output=embed"
                    width="100%"
                    height="260"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal from="right" distance={64} className="lg:col-span-7">
              <div className="glass rounded-3xl p-6">
                <h3 className="text-lg font-extrabold">Send a message</h3>
                <p className="mt-2 text-sm text-ink-200">
                  Opens your email client. Want a fully automated form (API + spam protection)? We can wire it up.
                </p>

                <form
                  className="mt-6 grid gap-4 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!isValid) return
                    window.location.href = mailtoHref
                  }}
                >
                  <label className="grid gap-1">
                    <span className="text-xs font-semibold text-ink-200">Name</span>
                    <input
                      className="h-11 rounded-2xl border border-white/10 bg-ink-950/50 px-4 text-sm outline-none focus:border-cyra-400/70"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label className="grid gap-1">
                    <span className="text-xs font-semibold text-ink-200">Email</span>
                    <input
                      className="h-11 rounded-2xl border border-white/10 bg-ink-950/50 px-4 text-sm outline-none focus:border-cyra-400/70"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      autoComplete="email"
                      inputMode="email"
                      required
                    />
                  </label>

                  <label className="grid gap-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-ink-200">Subject</span>
                    <input
                      className="h-11 rounded-2xl border border-white/10 bg-ink-950/50 px-4 text-sm outline-none focus:border-cyra-400/70"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="How can we help?"
                    />
                  </label>

                  <label className="grid gap-1 sm:col-span-2">
                    <span className="text-xs font-semibold text-ink-200">Message</span>
                    <textarea
                      className="min-h-32 rounded-2xl border border-white/10 bg-ink-950/50 px-4 py-3 text-sm outline-none focus:border-cyra-400/70"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your goals, timeline, and current setup."
                      required
                    />
                  </label>

                  <div className="sm:col-span-2 flex flex-wrap gap-3">
                    <Button type="submit" disabled={!isValid}>
                      Send message
                    </Button>
                    <a
                      className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-ink-200 hover:text-ink-50"
                      href={mailtoHref}
                    >
                      Or open email directly
                    </a>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>
      </Container>
    </section>
  )
}
