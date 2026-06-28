'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Key3D from './Key3D'

interface Props {
  onStart: () => void
}

interface Particle {
  x: number
  y: number
  text: string
  baseSize: number
  speedX: number
  speedY: number
  alpha: number
}

const SYMBOLS = ['{ }', '</>', ';', '++', 'x', 'if', 'loop']

export default function HeroAnimation({ onStart }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })
  const animIdRef = useRef<number>(0)
  const [doorsOpen, setDoorsOpen] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)


  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const mkParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      text: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      baseSize: Math.random() * 12 + 12,
      speedX: Math.random() * 0.4 - 0.2,
      speedY: Math.random() * -0.4 - 0.1,
      alpha: Math.random() * 0.5 + 0.2,
    })

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const count = Math.min(Math.floor(canvas.width / 25), 70)
      particlesRef.current = Array.from({ length: count }, mkParticle)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mouse = mouseRef.current
      particlesRef.current.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.y < -20) p.y = canvas.height + 20
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.hypot(dx, dy)
          if (dist < 160) {
            const force = (160 - dist) / 160
            p.x += (dx / dist) * force * 3
            p.y += (dy / dist) * force * 3
          }
        }

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.font = `bold ${p.baseSize}px monospace`
        ctx.fillStyle = Math.round(p.baseSize) % 2 === 0 ? '#00f0ff' : '#a855f7'
        ctx.shadowColor = ctx.fillStyle
        ctx.shadowBlur = 10
        ctx.fillText(p.text, p.x, p.y)
        ctx.restore()
      })
      animIdRef.current = requestAnimationFrame(animate)
    }

    const onMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onMouseOut = () => { mouseRef.current = { x: null, y: null } }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseout', onMouseOut)
    window.addEventListener('resize', init)

    init()
    animate()

    return () => {
      cancelAnimationFrame(animIdRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('resize', init)
    }
  }, [])

  const openSesame = () => {
    if (isUnlocked) return

    // Burst particles outward
    const canvas = canvasRef.current
    if (canvas) {
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      particlesRef.current.forEach((p) => {
        const dx = p.x - cx
        const dy = p.y - cy
        const dist = Math.hypot(dx, dy) || 1
        p.speedX = (dx / dist) * 22
        p.speedY = (dy / dist) * 22
      })
    }

    // 1. Key glows and fades
    setIsUnlocked(true)

    // 2. Doors split open after key flash
    setTimeout(() => setDoorsOpen(true), 600)

    // 3. Navigate after doors finish opening
    setTimeout(onStart, 2100)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: '#0b0c10' }}>

      {/* LEFT DOOR */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '50%', height: '100%', zIndex: 5, overflow: 'hidden',
          transform: doorsOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1)',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '200%', height: '100%' }}>
          <Image src="/cave.png" alt="" fill style={{ objectFit: 'cover', objectPosition: 'left center' }} priority />
        </div>
      </div>

      {/* RIGHT DOOR */}
      <div
        style={{
          position: 'absolute', top: 0, right: 0,
          width: '50%', height: '100%', zIndex: 5, overflow: 'hidden',
          transform: doorsOpen ? 'translateX(100%)' : 'translateX(0)',
          transition: 'transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1)',
        }}
      >
        <div style={{ position: 'absolute', top: 0, right: 0, width: '200%', height: '100%' }}>
          <Image src="/cave.png" alt="" fill style={{ objectFit: 'cover', objectPosition: 'right center' }} priority />
        </div>
      </div>

      {/* Particle canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* Hero content */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <Key3D isUnlocked={isUnlocked} onClick={openSesame} />

      </div>
    </div>
  )
}
