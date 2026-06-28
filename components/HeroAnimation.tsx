'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from '@/context/LocaleContext'

interface Props {
  onStart: () => void
}

interface Particle {
  x: number
  y: number
  text: string
  baseSize: number
  size: number
  speedX: number
  speedY: number
  alpha: number
  glow: number
}

const SYMBOLS = ['{ }', '</>', '*', '1', '0', '++', 'x', ';']

export default function HeroAnimation({ onStart }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<{ x: number | null; y: number | null; radius: number }>({
    x: null, y: null, radius: 150,
  })
  const animIdRef = useRef<number>(0)
  const { t } = useLocale()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      text: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      baseSize: Math.random() * 14 + 10,
      size: Math.random() * 14 + 10,
      speedX: (Math.random() * 0.6 - 0.3) * 1.5,
      speedY: (Math.random() * -0.5 - 0.2) * 1.5,
      alpha: Math.random() * 0.4 + 0.2,
      glow: Math.random() * 15 + 5,
    })

    const initParticles = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const count = Math.min(Math.floor(canvas.width / 20), 80)
      particlesRef.current = Array.from({ length: count }, createParticle)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mouse = mouseRef.current
      particlesRef.current.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.y < -30) p.y = canvas.height + 30
        if (p.x < -30) p.x = canvas.width + 30
        if (p.x > canvas.width + 30) p.x = -30

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const distance = Math.hypot(dx, dy)
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius
            p.x += (dx / distance) * force * 2
            p.y += (dy / distance) * force * 2
            p.size = p.baseSize + force * 6
          } else {
            if (p.size > p.baseSize) p.size -= 0.2
          }
        }

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.font = `bold ${p.size}px monospace`
        ctx.fillStyle = Math.round(p.baseSize) % 2 === 0 ? '#00f0ff' : '#bd00ff'
        ctx.shadowColor = ctx.fillStyle
        ctx.shadowBlur = p.glow
        ctx.fillText(p.text, p.x, p.y)
        ctx.restore()
      })
      animIdRef.current = requestAnimationFrame(animate)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    const onMouseOut = () => {
      mouseRef.current.x = null
      mouseRef.current.y = null
    }
    const onResize = () => initParticles()

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseout', onMouseOut)
    window.addEventListener('resize', onResize)

    initParticles()
    animate()

    return () => {
      cancelAnimationFrame(animIdRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const handleStart = () => {
    const particles = particlesRef.current
    const canvas = canvasRef.current
    if (canvas) {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      particles.forEach((p) => {
        const dx = p.x - cx
        const dy = p.y - cy
        const dist = Math.hypot(dx, dy) || 1
        p.speedX = (dx / dist) * 15
        p.speedY = (dy / dist) * 15
        p.alpha = 1
      })
    }
    setTimeout(onStart, 600)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden"
      style={{ background: 'radial-gradient(circle at center, #1a0f47 0%, #0b0726 100%)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-5 pointer-events-none">
        <h1
          className="font-cinzel font-black"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            letterSpacing: '0.08em',
            background: 'linear-gradient(45deg, #ffd700, #ff9d00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.5))',
            lineHeight: 1,
          }}
        >
          CHAABI
        </h1>

        <p
          className="font-cinzel font-semibold mb-4 mt-4"
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.6rem)',
            letterSpacing: '3px',
            color: '#cbd5e1',
          }}
        >
          {t('landing.tagline')}
        </p>

        <p
          className="font-nunito mb-10 max-w-xl"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: 'rgba(203,213,225,0.6)', fontWeight: 400 }}
        >
          {t('landing.description')}
        </p>

        {/* Magical key — click to enter */}
        <motion.button
          onClick={handleStart}
          className="pointer-events-auto flex flex-col items-center gap-3"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.93 }}
        >
          <motion.div
            animate={{
              y: [0, -14, 0],
              rotateZ: [-6, 6, -6],
              filter: [
                'drop-shadow(0 0 8px rgba(255,215,0,0.5)) drop-shadow(0 0 2px rgba(255,165,0,0.3))',
                'drop-shadow(0 0 28px rgba(255,215,0,1)) drop-shadow(0 0 55px rgba(255,140,0,0.6))',
                'drop-shadow(0 0 8px rgba(255,215,0,0.5)) drop-shadow(0 0 2px rgba(255,165,0,0.3))',
              ],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="64" height="154" viewBox="0 0 64 154" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Bow (ring) outer */}
              <circle cx="32" cy="30" r="24" stroke="url(#kg)" strokeWidth="8" fill="none" />
              {/* Bow inner hole */}
              <circle cx="32" cy="30" r="11" stroke="url(#kg)" strokeWidth="4" fill="rgba(255,215,0,0.08)" />
              {/* Shaft */}
              <rect x="28" y="52" width="8" height="72" rx="4" fill="url(#kg)" />
              {/* Teeth */}
              <rect x="36" y="90"  width="16" height="8" rx="3" fill="url(#kg)" />
              <rect x="36" y="107" width="11" height="8" rx="3" fill="url(#kg)" />
              <rect x="36" y="124" width="16" height="8" rx="3" fill="url(#kg)" />
              <defs>
                <linearGradient id="kg" x1="0" y1="0" x2="0" y2="154" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#ffe566" />
                  <stop offset="50%"  stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#cc8800" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.span
            className="font-nunito"
            style={{
              fontSize: '0.78rem',
              letterSpacing: '2.5px',
              color: 'rgba(255,215,0,0.55)',
              textTransform: 'uppercase',
            }}
            animate={{ opacity: [0.45, 0.9, 0.45] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            {t('landing.startQuest')}
          </motion.span>
        </motion.button>
      </div>
    </div>
  )
}
