import { Linkedin, Twitter } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { Container } from './Container'

export function Footer() {
  const year = new Date().getFullYear()
  const { t } = useI18n()
  return (
    <footer className="force-dark border-t border-white/10 bg-ink-950 text-ink-50">
      <Container>
        <div className="py-20 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-10">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="CYRA"
                  className="h-12 w-auto rounded-xl bg-white/5 px-2 py-1"
                  loading="lazy"
                />
                <div className="leading-tight">
                  <div className="text-sm font-extrabold tracking-wide">CYRA</div>
                  <div className="text-xs text-ink-200">Cyber Era, Ltd.</div>
                </div>
              </div>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-100">
                {t('footer.tagline')}
              </p>

              <div className="mt-6 space-y-2 text-sm text-ink-100">
                <div>{t('footer.addressValue')}</div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <a
                    className="hover:text-ink-50 transition-colors text-left [direction:ltr] [unicode-bidi:plaintext]"
                    dir="ltr"
                    href="mailto:info@cyra.om"
                  >
                    info@cyra.om
                  </a>
                  <span className="text-white/20">•</span>
                  <a
                    className="hover:text-ink-50 transition-colors text-left [direction:ltr] [unicode-bidi:plaintext]"
                    dir="ltr"
                    href="tel:+96876886668"
                  >
                    +968 7688 6668
                  </a>
                  <span className="text-white/20">•</span>
                  <a
                    className="hover:text-ink-50 transition-colors text-left [direction:ltr] [unicode-bidi:plaintext]"
                    dir="ltr"
                    href="tel:+96891905008"
                  >
                    +968 9190 5008
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:flex lg:justify-end">
              <div>
                <div className="text-xs font-extrabold tracking-[0.22em] text-ink-200">
                  CONNECT
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <a
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
                    href="#"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
                    href="#"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-white/10 pt-10 text-xs text-ink-200">
            Copyright ©{year} Cyber Era, Ltd. {t('footer.copyright')}
          </div>
        </div>
      </Container>
    </footer>
  )
}
