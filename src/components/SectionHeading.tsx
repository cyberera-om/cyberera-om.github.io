import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion'

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.55 }}
      className="mx-auto max-w-2xl text-center"
    >
      {eyebrow ? (
        <motion.p
          variants={fadeUp}
          className="text-xs font-bold tracking-[0.22em] text-cyra-300/90"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        variants={fadeUp}
        className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          className="mt-3 text-pretty text-base text-ink-200"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  )
}
