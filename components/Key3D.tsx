'use client'

import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'

function ArabicKey({ isUnlocked }: { isUnlocked: boolean }) {
  const groupRef = useRef<Group>(null)

  const mat = useMemo(() => ({
    base: new THREE.MeshStandardMaterial({
      color: '#B8860B', metalness: 0.80, roughness: 0.36,
      emissive: '#1A0B00', emissiveIntensity: 0.09,
    }),
    polish: new THREE.MeshStandardMaterial({
      color: '#D4AF37', metalness: 0.94, roughness: 0.12,
      emissive: '#5C3200', emissiveIntensity: 0.26,
    }),
    recess: new THREE.MeshStandardMaterial({
      color: '#7A5208', metalness: 0.62, roughness: 0.60,
    }),
  }), [])

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || isUnlocked) return
    groupRef.current.rotation.y += delta * 0.65
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.85) * 0.08
  })

  return (
    <group ref={groupRef} scale={0.88}>

      {/* ══════════════════════════════════════════
          BOW  —  large outer ring
      ══════════════════════════════════════════ */}
      <mesh material={mat.base} position={[0, 1.72, 0]}>
        <torusGeometry args={[0.54, 0.075, 20, 80]} />
      </mesh>

      {/* ── CROWN LOOPS: three rings emerging from top of bow ── */}
      {/* Centre crown loop */}
      <mesh material={mat.base} position={[0, 2.30, 0]}>
        <torusGeometry args={[0.125, 0.058, 14, 32]} />
      </mesh>
      {/* Left crown loop */}
      <mesh material={mat.base} position={[-0.23, 2.18, 0]}>
        <torusGeometry args={[0.095, 0.050, 12, 28]} />
      </mesh>
      {/* Right crown loop */}
      <mesh material={mat.base} position={[0.23, 2.18, 0]}>
        <torusGeometry args={[0.095, 0.050, 12, 28]} />
      </mesh>

      {/* ── INNER TREFOIL SCROLLWORK (inside the main ring) ── */}
      {/* Top inner scroll */}
      <mesh material={mat.base} position={[0, 1.88, 0]}>
        <torusGeometry args={[0.21, 0.048, 14, 36]} />
      </mesh>
      {/* Left inner scroll */}
      <mesh material={mat.base} position={[-0.23, 1.60, 0]}>
        <torusGeometry args={[0.155, 0.044, 12, 30]} />
      </mesh>
      {/* Right inner scroll */}
      <mesh material={mat.base} position={[0.23, 1.60, 0]}>
        <torusGeometry args={[0.155, 0.044, 12, 30]} />
      </mesh>
      {/* Centre bead where scrolls meet */}
      <mesh material={mat.polish} position={[0, 1.70, 0]}>
        <sphereGeometry args={[0.062, 12, 12]} />
      </mesh>
      {/* Small bead at top of inner scroll */}
      <mesh material={mat.polish} position={[0, 2.07, 0]}>
        <sphereGeometry args={[0.038, 8, 8]} />
      </mesh>

      {/* ── HANGING SCROLLWORK below ring (ornate tails) ── */}
      {/* Left lower scroll */}
      <mesh material={mat.base} position={[-0.27, 1.16, 0]}>
        <torusGeometry args={[0.135, 0.046, 12, 28]} />
      </mesh>
      {/* Right lower scroll */}
      <mesh material={mat.base} position={[0.27, 1.16, 0]}>
        <torusGeometry args={[0.135, 0.046, 12, 28]} />
      </mesh>
      {/* Tiny accent beads at scroll tips */}
      <mesh material={mat.polish} position={[-0.27, 0.99, 0]}>
        <sphereGeometry args={[0.032, 8, 8]} />
      </mesh>
      <mesh material={mat.polish} position={[0.27, 0.99, 0]}>
        <sphereGeometry args={[0.032, 8, 8]} />
      </mesh>
      {/* Centre stem connecting scrollwork to collar */}
      <mesh material={mat.base} position={[0, 1.10, 0]}>
        <cylinderGeometry args={[0.042, 0.065, 0.30, 8]} />
      </mesh>

      {/* ══════════════════════════════════════════
          COLLAR
      ══════════════════════════════════════════ */}
      <mesh material={mat.base} position={[0, 0.90, 0]}>
        <cylinderGeometry args={[0.105, 0.12, 0.24, 10]} />
      </mesh>
      {/* Decorative cross-guard on collar */}
      <mesh material={mat.base} position={[0, 0.90, 0]}>
        <boxGeometry args={[0.26, 0.06, 0.11]} />
      </mesh>
      <mesh material={mat.base} position={[0, 0.90, 0]}>
        <boxGeometry args={[0.06, 0.26, 0.11]} />
      </mesh>
      {/* Band rings */}
      <mesh material={mat.polish} position={[0, 1.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.11, 0.022, 8, 18]} />
      </mesh>
      <mesh material={mat.polish} position={[0, 0.79, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.128, 0.022, 8, 18]} />
      </mesh>

      {/* ══════════════════════════════════════════
          SHAFT — hexagonal (6 visible facets = texture)
      ══════════════════════════════════════════ */}
      <mesh material={mat.base} position={[0, -0.40, 0]}>
        <cylinderGeometry args={[0.070, 0.062, 2.30, 6]} />
      </mesh>
      {/* Decorative rib rings at regular intervals */}
      {[-0.02, -0.46, -0.90, -1.34].map((y, i) => (
        <mesh key={i} material={mat.polish} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.076, 0.016, 6, 16]} />
        </mesh>
      ))}
      {/* Thin engraved lines between ribs */}
      {[-0.24, -0.68, -1.12].map((y, i) => (
        <mesh key={i} material={mat.recess} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.073, 0.008, 6, 14]} />
        </mesh>
      ))}
      {/* 6 longitudinal edge ridges (matching hexagonal faces) */}
      {[0, 1, 2, 3, 4, 5].map((n) => {
        const a = (n * Math.PI) / 3
        return (
          <mesh
            key={n}
            material={mat.recess}
            position={[Math.sin(a) * 0.071, -0.40, Math.cos(a) * 0.071]}
            rotation={[0, -a, 0]}
          >
            <boxGeometry args={[0.016, 2.16, 0.005]} />
          </mesh>
        )
      })}

      {/* ══════════════════════════════════════════
          BIT COLLAR (ornate section before teeth)
      ══════════════════════════════════════════ */}
      <mesh material={mat.base} position={[0, -1.62, 0]}>
        <cylinderGeometry args={[0.098, 0.072, 0.20, 10]} />
      </mesh>
      <mesh material={mat.polish} position={[0, -1.53, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.104, 0.020, 8, 18]} />
      </mesh>
      <mesh material={mat.polish} position={[0, -1.71, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.104, 0.020, 8, 18]} />
      </mesh>

      {/* ══════════════════════════════════════════
          TEETH — three stepped cuts (classic skeleton-key bit)
      ══════════════════════════════════════════ */}
      {/* Wide tooth */}
      <mesh material={mat.base} position={[0.19, -1.87, 0]}>
        <boxGeometry args={[0.45, 0.145, 0.155]} />
      </mesh>
      {/* Narrow tooth (inset) */}
      <mesh material={mat.base} position={[0.12, -2.06, 0]}>
        <boxGeometry args={[0.30, 0.145, 0.155]} />
      </mesh>
      {/* Wide tooth */}
      <mesh material={mat.base} position={[0.19, -2.24, 0]}>
        <boxGeometry args={[0.45, 0.145, 0.155]} />
      </mesh>
      {/* Polish accent corners on teeth */}
      {([[0.41, -1.87], [0.41, -2.24], [0.26, -2.06]] as const).map(([x, y], i) => (
        <mesh key={i} material={mat.polish} position={[x, y, 0]}>
          <sphereGeometry args={[0.032, 8, 8]} />
        </mesh>
      ))}

      {/* ══════════════════════════════════════════
          TIP — small ring hole (classic ornate key detail)
      ══════════════════════════════════════════ */}
      {/* Short stem from last tooth to ring */}
      <mesh material={mat.base} position={[0, -2.40, 0]}>
        <cylinderGeometry args={[0.062, 0.055, 0.16, 8]} />
      </mesh>
      {/* The tip ring hole */}
      <mesh material={mat.base} position={[0, -2.50, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.065, 0.028, 12, 24]} />
      </mesh>

    </group>
  )
}

export default function Key3D({
  isUnlocked,
  onClick,
}: {
  isUnlocked: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        width:  'clamp(140px, 20vw, 240px)',
        height: 'clamp(280px, 48vh, 440px)',
        cursor: 'pointer',
        pointerEvents: 'auto',
        opacity:    isUnlocked ? 0 : 1,
        transition: isUnlocked ? 'opacity 1s ease' : undefined,
        filter: isUnlocked
          ? 'drop-shadow(0 0 80px rgba(212,175,55,1)) brightness(1.8)'
          : 'drop-shadow(0 0 22px rgba(212,175,55,0.5))',
      }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 6.0], fov: 48 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.28} />
        <pointLight position={[3, 3, 3]}    intensity={5.5} color="#ffaa33" />
        <pointLight position={[-2, 1, 2]}   intensity={2.5} color="#ffcc55" />
        <pointLight position={[0, -2, 2.5]} intensity={1.2} color="#cc7700" />

        <Suspense fallback={null}>
          <ArabicKey isUnlocked={isUnlocked} />
          <Sparkles
            count={22}
            scale={[1.2, 5.5, 1.2]}
            size={1.2}
            speed={0.28}
            color="#D4AF37"
            position={[0, -0.4, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
