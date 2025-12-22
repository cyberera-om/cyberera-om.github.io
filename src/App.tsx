import { About } from './components/About'
import { Contact } from './components/Contact'
import { Consultation } from './components/Consultation'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Services } from './components/Services'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

export default function App() {
  return (
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
  )
}
