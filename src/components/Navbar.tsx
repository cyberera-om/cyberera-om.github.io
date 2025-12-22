import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { cn } from '../lib/utils'
import { useTheme } from '../lib/theme'
import { useI18n } from '../lib/i18n'
import { Button } from './Button'
import { Container } from './Container'

function scrollToHash(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Navbar() {
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overHero, setOverHero] = useState(true)
  const { theme, toggleTheme } = useTheme()

  const { lang, dir, setLang, t } = useI18n()

  const links = useMemo(
    () => [
      { href: '#about', label: t('nav.about') },
      { href: '#services', label: t('nav.services') },
      { href: '#contact', label: t('nav.contact') },
    ],
    [t],
  )

  const cta = useMemo(() => ({ href: '#contact', label: t('nav.requestConsultation') }), [t])

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'ar' : 'en')
  }, [lang, setLang])

  useEffect(() => {
    // With OverlayScrollbars, scrolling happens inside its viewport (not window).
    const viewport = document.querySelector('.app-scroll .os-viewport') as HTMLElement | null

    const compute = () => {
      const y = viewport ? viewport.scrollTop : window.scrollY
      setScrolled(y > 12)

      const hero = document.getElementById('hero')
      const heroH = hero?.offsetHeight ?? 0
      // Navbar overlays Hero while we're roughly within the hero block.
      // Using height/scrollTop is robust for custom scroll containers.
      setOverHero(heroH ? y < heroH - 72 : y < 520)
    }

    compute()
    const target: HTMLElement | Window = viewport ?? window
    target.addEventListener('scroll', compute as any, { passive: true } as any)
    window.addEventListener('resize', compute, { passive: true })

    return () => {
      target.removeEventListener('scroll', compute as any)
      window.removeEventListener('resize', compute)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <motion.div
        initial={reduceMotion ? false : { y: -12, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          // No border; rely on blur + subtle background to separate from content.
          'backdrop-blur-md supports-[backdrop-filter]:bg-ink-950/35',
          // Ensure nav stays readable over the always-dark Hero even when site theme is light.
          overHero ? 'force-dark' : undefined,
          // Background + border that work in BOTH themes because ink tokens invert with theme.
          scrolled
            ? 'bg-ink-950/70'
            : overHero
              ? 'bg-gradient-to-b from-ink-950/60 to-ink-950/0'
              : 'bg-transparent',
        )}
      >
        <Container className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-3" aria-label="CYRA Home">
            <img
              src="/logo.png"
              alt="CYRA"
              className="h-12 w-auto rounded-xl bg-white/5 px-2 py-1"
              loading="eager"
            />
          </a>

          <nav
            dir={dir}
            className={cn(
              'hidden items-center gap-7 md:flex',
              dir === 'rtl' ? 'text-right' : undefined,
            )}
            aria-label="Primary"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHash(l.href)
                }}
                className="text-sm font-semibold text-ink-200 hover:text-ink-50 transition-colors"
              >
                {l.label}
              </a>
            ))}

            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-ink-50/10 bg-ink-900/10 hover:bg-ink-900/15 px-3 text-sm font-semibold text-ink-50"
              aria-label={lang === 'en' ? t('lang.arabic') : t('lang.english')}
              onClick={toggleLang}
            >
              {lang === 'en' ? 'AR' : 'EN'}
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-50/10 bg-ink-900/10 hover:bg-ink-900/15 text-ink-50"
              aria-label={theme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Button
              onClick={(e) => {
                e.preventDefault()
                scrollToHash(cta.href)
              }}
            >
              {cta.label}
            </Button>
          </nav>

          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-50/12 bg-ink-900/10 text-ink-50"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </Container>

        {open ? (
          <div className="md:hidden" id="mobile-nav">
            <Container className="pb-4">
              <div dir={dir} className="mt-2 rounded-2xl border border-white/10 bg-ink-950/80 p-2">
                <button
                  type="button"
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-ink-100 hover:bg-white/5',
                    dir === 'rtl' ? 'text-right' : undefined,
                  )}
                  onClick={() => {
                    toggleTheme()
                  }}
                >
                  <span>{t('nav.theme')}</span>
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                <button
                  type="button"
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-ink-100 hover:bg-white/5',
                    dir === 'rtl' ? 'text-right' : undefined,
                  )}
                  onClick={() => {
                    toggleLang()
                  }}
                >
                  <span>{lang === 'en' ? t('lang.arabic') : t('lang.english')}</span>
                  <span className="text-xs text-ink-300">{lang === 'en' ? 'AR' : 'EN'}</span>
                </button>

                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className={cn(
                      'block rounded-xl px-4 py-3 text-sm font-semibold text-ink-100 hover:bg-white/5',
                      dir === 'rtl' ? 'text-right' : undefined,
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      setOpen(false)
                      scrollToHash(l.href)
                    }}
                  >
                    {l.label}
                  </a>
                ))}
                <div className="p-2">
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault()
                      setOpen(false)
                      scrollToHash(cta.href)
                    }}
                  >
                    {cta.label}
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        ) : null}
      </motion.div>
    </header>
  )
}
