import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

type SiteLoaderProps = {
  show: boolean
  title?: string
  subtitle?: string
  footer?: string
}

export function SiteLoader({ show, title }: SiteLoaderProps) {
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
          {/* Minimal backdrop */}
          <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" />

          {/* Spinner only (no visible text) */}
          <motion.div
            initial={reduceMotion ? false : { scale: 0.98, opacity: 0 }}
            animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="h-12 w-12 rounded-full border-4 border-white/20 border-t-cyra-400 animate-spin"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
