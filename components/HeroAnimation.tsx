'use client'

import { useEffect, useRef } from 'react'
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
          className="font-cinzel font-black mb-4"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            letterSpacing: '2px',
            background: 'linear-gradient(45deg, #ffd700, #ff9d00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.4))',
          }}
        >
          {t('landing.tagline')}
        </h1>

        <p
          className="font-nunito mb-10 max-w-xl"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: '#cbd5e1', fontWeight: 400 }}
        >
          {t('landing.description')}
        </p>

        <button
          onClick={handleStart}
          className="pointer-events-auto font-nunito font-bold flex items-center gap-3 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #ffd700 0%, #ff8800 100%)',
            color: '#0b0726',
            border: 'none',
            padding: '18px 40px',
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(255,215,0,0.3), inset 0 -4px 0 rgba(0,0,0,0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08) translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 0 45px rgba(255,215,0,0.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0)'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(255,215,0,0.3), inset 0 -4px 0 rgba(0,0,0,0.2)'
          }}
        >
          <span>🔑</span> {t('landing.startQuest')}
        </button>
      </div>
    </div>
  )
}
