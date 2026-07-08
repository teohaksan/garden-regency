import { useEffect, useRef, useState } from 'react'

/**
 * CountUp — Animates a numeric value from 0 to target when scrolled into view
 * (or immediately on mount when `animateOnMount` is set).
 * Parses mixed strings like "566", "3.5m", "60%", "10.6萬呎" by extracting
 * leading/trailing text and the numeric portion. Preserves decimals.
 */
export default function CountUp({
  value,
  duration = 1800,
  prefix = '',
  suffix = '',
  className = '',
  animateOnMount = false,
}) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  const raw = String(value ?? '')
  const match = raw.match(/^([^\d.]*)([\d.]+)(.*)$/)
  const prefixText = match ? match[1] : ''
  const numericValue = match ? parseFloat(match[2]) : 0
  const suffixText = match ? match[3] : ''
  const numStr = match ? match[2] : ''
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0

  useEffect(() => {
    if (!ref.current || hasAnimated) return
    const node = ref.current

    const runAnimation = () => {
      if (hasAnimated) return
      setHasAnimated(true)
      const start = performance.now()
      const tick = (now) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(numericValue * eased)
        if (progress < 1) requestAnimationFrame(tick)
        else setDisplay(numericValue)
      }
      requestAnimationFrame(tick)
    }

    if (animateOnMount) {
      runAnimation()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) runAnimation()
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [numericValue, duration, hasAnimated, animateOnMount])

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString('en-US')

  return (
    <span ref={ref} className={className}>
      {prefixText}
      {prefix}
      {formatted}
      {suffix}
      {suffixText}
    </span>
  )
}
