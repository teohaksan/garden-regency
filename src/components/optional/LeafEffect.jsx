import { useEffect, useRef } from 'react'

/**
 * LeafEffect — Garden Regency variant of the canvas-based decorative effect.
 * Inspired by Victoria Blossom's FlowerEffect.
 *
 * Behavior:
 *  - Green leaves follow the cursor (canvas-rendered leaf shapes).
 *  - Auto-spawns gentle falling leaves in the background for ambient effect.
 *  - Pauses when the contact section is in view (so forms stay clean).
 *  - Excludes the bottom-right 200×200px zone (WhatsApp/Call buttons).
 */
export default function LeafEffect({ contactSectionId = 'contact', stopSectionId = null }) {
  const canvasRef = useRef(null)
  const leavesRef = useRef([])
  const ambientLeavesRef = useRef([])
  const lastSpawn = useRef(0)
  const lastAmbient = useRef(0)
  const isActiveRef = useRef(true)
  const observerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Pause when contact / form sections are visible
    let stopObserverRef = null

    function setupObserver() {
      // Pause when contact section is visible
      const contactEl = document.getElementById(contactSectionId)
      if (contactEl && !observerRef.current) {
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            isActiveRef.current = !entry.isIntersecting
          },
          { threshold: 0.1 }
        )
        observerRef.current.observe(contactEl)
      }
      // Also stop ambient leaves when stopSectionId is visible (e.g. location)
      if (stopSectionId) {
        const stopEl = document.getElementById(stopSectionId)
        if (stopEl && !stopObserverRef) {
          stopObserverRef = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                ambientLeavesRef.current = []
              }
            },
            { threshold: 0 }
          )
          stopObserverRef.observe(stopEl)
        }
      }
    }
    setupObserver()
    // Retry once after mount in case section appears later
    const retry = setTimeout(setupObserver, 500)

    // Fallback: scroll-based pause near the bottom of the page
    function onScroll() {
      const scrollY = window.scrollY || window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const percent = scrollY / docHeight
      if (percent > 0.7) isActiveRef.current = false
      else if (percent < 0.6) isActiveRef.current = true
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Palette: deep emerald → fresh leaf green
    const LEAF_COLORS = [
      'rgba(74, 124, 46, 0.85)',   // forest green
      'rgba(107, 159, 71, 0.85)',  // olive
      'rgba(45, 80, 22, 0.85)',    // dark moss
      'rgba(143, 188, 79, 0.8)',   // bright spring
      'rgba(200, 169, 110, 0.7)',  // gold accent (rare)
    ]

    // Cursor-traced leaf
    class Leaf {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.age = 0
        this.maxAge = 160
        this.size = 14 + Math.random() * 18
        this.color = LEAF_COLORS[Math.floor(Math.random() * 4)]
        this.rotation = Math.random() * Math.PI * 2
        this.rotSpeed = (Math.random() - 0.5) * 0.012
        this.drift = (Math.random() - 0.5) * 0.4
      }

      draw(ctx) {
        this.age++
        if (this.age > this.maxAge) return false
        const p = this.age / this.maxAge
        let alpha = p < 0.12 ? p / 0.12 : p > 0.75 ? 1 - (p - 0.75) / 0.25 : 1
        const scale = p < 0.08 ? p / 0.08 : 1
        this.x += this.drift
        this.y += 0.3

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate((this.rotation += this.rotSpeed))
        ctx.globalAlpha = alpha
        const s = this.size * scale

        // Leaf body — pointed oval
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.moveTo(0, -s)
        ctx.bezierCurveTo(s * 0.7, -s * 0.5, s * 0.7, s * 0.5, 0, s)
        ctx.bezierCurveTo(-s * 0.7, s * 0.5, -s * 0.7, -s * 0.5, 0, -s)
        ctx.closePath()
        ctx.fill()

        // Central vein
        ctx.globalAlpha = alpha * 0.5
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
        ctx.lineWidth = 0.6
        ctx.beginPath()
        ctx.moveTo(0, -s * 0.85)
        ctx.lineTo(0, s * 0.85)
        ctx.stroke()

        // Side veins
        ctx.globalAlpha = alpha * 0.3
        ctx.lineWidth = 0.4
        for (let v = -0.5; v <= 0.5; v += 0.25) {
          ctx.beginPath()
          ctx.moveTo(0, v * s)
          ctx.quadraticCurveTo(s * 0.3, v * s - s * 0.1, s * 0.55, v * s - s * 0.3)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(0, v * s)
          ctx.quadraticCurveTo(-s * 0.3, v * s - s * 0.1, -s * 0.55, v * s - s * 0.3)
          ctx.stroke()
        }

        ctx.restore()
        return true
      }
    }

    // Ambient falling leaf (background, slow)
    class FallingLeaf {
      constructor() {
        this.reset()
        this.y = -20 - Math.random() * 200
      }

      reset() {
        this.x = Math.random() * window.innerWidth
        this.y = -30
        this.size = 10 + Math.random() * 14
        this.color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)]
        this.rotation = Math.random() * Math.PI * 2
        this.rotSpeed = (Math.random() - 0.5) * 0.02
        this.fallSpeed = 0.3 + Math.random() * 0.5
        this.swayAmplitude = 30 + Math.random() * 40
        this.swaySpeed = 0.005 + Math.random() * 0.01
        this.swayOffset = Math.random() * Math.PI * 2
        this.opacity = 0.35 + Math.random() * 0.35
      }

      draw(ctx, time) {
        this.y += this.fallSpeed
        const sway = Math.sin(time * this.swaySpeed + this.swayOffset) * this.swayAmplitude
        if (this.y > window.innerHeight + 50) {
          this.reset()
          return true
        }

        ctx.save()
        ctx.translate(this.x + sway, this.y)
        ctx.rotate((this.rotation += this.rotSpeed))
        ctx.globalAlpha = this.opacity
        const s = this.size

        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.moveTo(0, -s)
        ctx.bezierCurveTo(s * 0.7, -s * 0.5, s * 0.7, s * 0.5, 0, s)
        ctx.bezierCurveTo(-s * 0.7, s * 0.5, -s * 0.7, -s * 0.5, 0, -s)
        ctx.closePath()
        ctx.fill()

        ctx.globalAlpha = this.opacity * 0.4
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.lineWidth = 0.4
        ctx.beginPath()
        ctx.moveTo(0, -s * 0.8)
        ctx.lineTo(0, s * 0.8)
        ctx.stroke()

        ctx.restore()
        return true
      }
    }

    // Spawn a few ambient leaves on init
    for (let i = 0; i < 5; i++) ambientLeavesRef.current.push(new FallingLeaf())

    const CORNER_SIZE = 200

    function handleMouseMove(e) {
      if (!isActiveRef.current) return
      // Exclude bottom-right (WhatsApp / Call buttons)
      if (
        e.clientX > window.innerWidth - CORNER_SIZE &&
        e.clientY > window.innerHeight - CORNER_SIZE
      ) {
        return
      }
      if (Date.now() - lastSpawn.current < 110) return
      if (leavesRef.current.length >= 12) return
      leavesRef.current.push(new Leaf(e.clientX, e.clientY))
      lastSpawn.current = Date.now()
    }
    window.addEventListener('mousemove', handleMouseMove)

    let rafId = 0
    let cancelled = false
    function animate(time) {
      if (cancelled) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Ambient leaves always draw (subtle background)
      ambientLeavesRef.current.forEach((l) => l.draw(ctx, time))
      // Cursor leaves only when active
      if (isActiveRef.current) {
        leavesRef.current = leavesRef.current.filter((f) => f.draw(ctx))
        // Occasionally spawn an extra ambient leaf
        if (Date.now() - lastAmbient.current > 1800 && ambientLeavesRef.current.length < 8) {
          ambientLeavesRef.current.push(new FallingLeaf())
          lastAmbient.current = Date.now()
        }
      }
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(retry)
      if (observerRef.current) observerRef.current.disconnect()
      if (stopObserverRef) stopObserverRef.disconnect()
    }
  }, [contactSectionId, stopSectionId])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    />
  )
}
