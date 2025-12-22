import { Linkedin, Twitter } from 'lucide-react'
import { Container } from './Container'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="force-dark border-t border-white/10 py-16 sm:py-20 bg-ink-950 text-ink-50">
      <Container>
        <div className="grid gap-12 md:grid-cols-3 lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="CYRA"
                className="h-12 w-auto rounded-xl bg-white/5 px-2 py-1"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-sm text-ink-100">
              P.O BOX: 121, Postal Code: 312, Muscat, Sultanate of Oman
            </p>
            <p className="mt-2 text-sm text-ink-100">
              <a className="hover:text-ink-50" href="mailto:info@cyra.om">
                info@cyra.om
              </a>
              <span className="mx-2 text-white/20">•</span>
              <a className="hover:text-ink-50" href="tel:+96876886668">
                +968 7688 6668
              </a>
            </p>
          </div>

          <div>
            <div className="text-sm font-extrabold">Links</div>
            <ul className="mt-4 space-y-2 text-sm text-ink-100">
              <li>
                <a className="hover:text-ink-50" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="hover:text-ink-50" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:text-ink-50" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-extrabold">Connect</div>
            <div className="mt-4 flex items-center gap-3">
              <a
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white"
                href="#"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white"
                href="#"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-xs text-ink-200">
              © {year} Cyber Era, Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
