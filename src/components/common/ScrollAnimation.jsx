import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * ScrollAnimation — Reveals children with a fade + slide-up when scrolled
 * into view. Uses useInView (manual IntersectionObserver) which fires
 * reliably in all browsers including headless capture.
 */
export default function ScrollAnimation({ children, className = '', delay = 0, y = 40 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
