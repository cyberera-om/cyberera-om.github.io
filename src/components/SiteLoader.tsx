import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type SiteLoaderProps = {
  show: boolean
  title?: string
  subtitle?: string
  footer?: string
}

export function SiteLoader({ show, title, subtitle, footer }: SiteLoaderProps) {
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="site-loader"
          role="status"
          aria-live="polite"
          aria-label={title ?? 'Loading'}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] grid place-items-center"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ink-950/45 backdrop-blur-2xl" />

          {/* Subtle texture + glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_20%_10%,rgba(249,115,22,0.25),transparent_40%),radial-gradient(circle_at_80%_25%,rgba(255,255,255,0.10),transparent_45%),radial-gradient(circle_at_50%_90%,rgba(249,115,22,0.18),transparent_55%)]"
          />

          <motion.div
            initial={reduceMotion ? false : { y: 10, opacity: 0, scale: 0.98 }}
            animate={reduceMotion ? undefined : { y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative mx-6 w-[min(420px,92vw)] rounded-3xl p-7 shadow-glow"
          >
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-cyra-500/10" />

            <div className="flex items-center gap-4">
              <div className="relative grid h-12 w-12 place-items-center">
                <div className="absolute inset-0 rounded-full border border-white/10 bg-white/5" />
                <div className="h-9 w-9 rounded-full border-2 border-white/15 border-t-cyra-400 animate-spin" />
              </div>

              <div className="min-w-0">
                <div className="text-sm font-extrabold tracking-tight text-ink-50">
                  {title ?? 'Loading…'}
                </div>
                {subtitle ? (
                  <div className="mt-1 text-xs text-ink-300">{subtitle}</div>
                ) : (
                  <div className="mt-1 text-xs text-ink-300">Please wait a moment.</div>
                )}
              </div>
            </div>

            <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.0)_0%,rgba(255,255,255,0.18)_25%,rgba(249,115,22,0.35)_50%,rgba(255,255,255,0.18)_75%,rgba(255,255,255,0.0)_100%)] bg-[length:220%_100%] animate-shimmer" />
            </div>

            <div className="mt-4 text-[11px] text-ink-400">
              <span className="sr-only">Loading site resources.</span>
              {footer ?? (
                <>
                  Optimizing images &amp; animations <span aria-hidden="true">•</span> Secure-by-design
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
