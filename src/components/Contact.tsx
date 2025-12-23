import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '../lib/utils'
import { useI18n } from '../lib/i18n'
import { Button } from './Button'
import { Container } from './Container'
import { OsmThemeMap } from './OsmThemeMap'
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
  const { t, dir } = useI18n()
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
      subject: subject || t('contact.mailSubject'),
      body,
    })
  }, [email, message, name, subject, t])

  const isValid = useMemo(() => {
    if (!name.trim()) return false
    if (!email.trim() || !email.includes('@')) return false
    if (!message.trim()) return false
    return true
  }, [email, message, name])

  return (
    <section id="contact" className="relative py-20 sm:py-24 overflow-x-hidden">
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
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          description={t('contact.description')}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <ScrollReveal from="left" distance={64} className="lg:col-span-5 flex">
              <div className="glass flex-1 rounded-3xl p-6 flex flex-col">
                <h3 className="text-lg font-extrabold">{t('contact.detailsTitle')}</h3>
                  <div className="mt-5 space-y-4 text-sm text-ink-200">
                    <div
                      className={cn(
                        'flex items-start gap-3',
                        dir === 'rtl' ? 'flex-row-reverse text-right' : undefined,
                      )}
                    >
                      <div className="mt-0.5 shrink-0 text-cyra-300">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-ink-100">{t('contact.addressLabel')}</div>
                        <div>{t('contact.addressValue')}</div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        'flex items-start gap-3',
                        dir === 'rtl' ? 'flex-row-reverse text-right' : undefined,
                      )}
                    >
                      <div className="mt-0.5 shrink-0 text-cyra-300">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-ink-100">{t('contact.phoneLabel')}</div>
                        <div className={cn('mt-1 w-full space-y-1', dir === 'rtl' ? 'text-left' : undefined)}>
                          <a
                            className="inline-block hover:text-white [direction:ltr] [unicode-bidi:plaintext]"
                            dir="ltr"
                            href="tel:+96876886668"
                          >
                              +968 7688 6668
                          </a>
                          <div>
                            <a
                              className="inline-block hover:text-white [direction:ltr] [unicode-bidi:plaintext]"
                              dir="ltr"
                              href="tel:+96891905008"
                            >
                              +968 9190 5008
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={cn(
                        'flex items-start gap-3',
                        dir === 'rtl' ? 'flex-row-reverse text-right' : undefined,
                      )}
                    >
                      <div className="mt-0.5 shrink-0 text-cyra-300">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-ink-100">{t('contact.emailLabel')}</div>
                        <a
                          className={cn(
                            'hover:text-white',
                            dir === 'rtl'
                              ? 'inline-block text-left [direction:ltr] [unicode-bidi:plaintext]'
                              : undefined,
                          )}
                          dir={dir === 'rtl' ? 'ltr' : undefined}
                          href="mailto:info@cyra.om"
                        >
                          info@cyra.om
                        </a>
                      </div>
                    </div>
                  </div>

                <div className="mt-6 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-ink-950">
                  <div className="h-full min-h-[260px] w-full bg-ink-950">
                    <OsmThemeMap className="h-full min-h-[260px] w-full bg-ink-950" />
                    <div className="border-t border-white/10 bg-ink-950/40 px-3 py-2 text-[10px] leading-snug text-ink-300">
                      {t('contact.mapAttribution')}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal from="right" distance={64} className="lg:col-span-7 flex">
              <div className="glass flex-1 rounded-3xl p-6 flex flex-col">
                <h3 className="text-lg font-extrabold">{t('contact.formTitle')}</h3>
                <p className="mt-2 text-sm text-ink-200">{t('contact.formHint')}</p>

                <form
                  className="mt-6 flex flex-1 flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!isValid) return
                    window.location.href = mailtoHref
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1">
                      <span className="text-xs font-semibold text-ink-200">{t('contact.nameLabel')}</span>
                      <input
                        className="h-11 rounded-2xl border border-ink-50/20 bg-ink-950/55 px-4 text-sm text-ink-50 placeholder:text-ink-400/80 outline-none focus:border-cyra-400/70 focus:ring-2 focus:ring-cyra-400/15"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('contact.namePlaceholder')}
                        autoComplete="name"
                        required
                      />
                    </label>

                    <label className="grid gap-1">
                      <span className="text-xs font-semibold text-ink-200">{t('contact.emailFieldLabel')}</span>
                      <input
                        className="h-11 rounded-2xl border border-ink-50/20 bg-ink-950/55 px-4 text-sm text-ink-50 placeholder:text-ink-400/80 outline-none focus:border-cyra-400/70 focus:ring-2 focus:ring-cyra-400/15"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('contact.emailPlaceholder')}
                        autoComplete="email"
                        inputMode="email"
                        required
                      />
                    </label>

                    <label className="grid gap-1 sm:col-span-2">
                      <span className="text-xs font-semibold text-ink-200">{t('contact.subjectLabel')}</span>
                      <input
                        className="h-11 rounded-2xl border border-ink-50/20 bg-ink-950/55 px-4 text-sm text-ink-50 placeholder:text-ink-400/80 outline-none focus:border-cyra-400/70 focus:ring-2 focus:ring-cyra-400/15"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder={t('contact.subjectPlaceholder')}
                      />
                    </label>
                  </div>

                  <label className="grid gap-1 flex-1">
                    <span className="text-xs font-semibold text-ink-200">{t('contact.messageLabel')}</span>
                    <textarea
                      className="flex-1 min-h-[220px] sm:min-h-[260px] lg:min-h-[320px] resize-none rounded-2xl border border-ink-50/20 bg-ink-950/55 px-4 py-3 text-sm text-ink-50 placeholder:text-ink-400/80 outline-none focus:border-cyra-400/70 focus:ring-2 focus:ring-cyra-400/15"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t('contact.messagePlaceholder')}
                      required
                    />
                  </label>

                  <div className="mt-auto flex flex-wrap gap-3">
                    <Button type="submit" disabled={!isValid}>
                      {t('contact.send')}
                    </Button>
                    <a
                      className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-ink-200 hover:text-ink-50"
                      href={mailtoHref}
                    >
                      {t('contact.openEmail')}
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
