import { useEffect, useState } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Consultation } from './components/Consultation'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Services } from './components/Services'
import { SiteLoader } from './components/SiteLoader'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { I18nProvider } from './lib/i18n'
import { preloadImages } from './lib/preload'

const CRITICAL_IMAGES = ['/logo.png', '/images/bg_1.jpg', '/images/bg_2.jpg', '/images/bg_3.jpg'] as const

function AppShell() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    const minVisibleMs = 650
    const hardTimeoutMs = 8000
    const startedAt = performance.now()

    const hard = window.setTimeout(() => {
      if (!cancelled) setReady(true)
    }, hardTimeoutMs)

    ;(async () => {
      await preloadImages(CRITICAL_IMAGES, { timeoutMs: hardTimeoutMs - 250 })

      const elapsed = performance.now() - startedAt
      const remaining = Math.max(0, minVisibleMs - elapsed)
      if (remaining) {
        await new Promise<void>((resolve) => window.setTimeout(resolve, remaining))
      }

      if (!cancelled) setReady(true)
      window.clearTimeout(hard)
    })()

    return () => {
      cancelled = true
      window.clearTimeout(hard)
    }
  }, [])

  return (
    <>
      <SiteLoader show={!ready} />

      {ready ? (
        <OverlayScrollbarsComponent
          defer
          options={{
            scrollbars: {
              theme: 'os-theme-dark',
              autoHide: 'leave',
              autoHideDelay: 450,
              clickScroll: true,
            },
          }}
          className="app-scroll min-h-dvh font-sans"
          style={{ height: '100dvh' }}
        >
          <div className="min-h-dvh">
            <Navbar />

            <main>
              <Hero />
              <About />
              <Services />
              <Consultation />
              <Contact />
            </main>

            <Footer />
          </div>
        </OverlayScrollbarsComponent>
      ) : null}
    </>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <AppShell />
    </I18nProvider>
  )
}
