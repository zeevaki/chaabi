'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from '@/context/LocaleContext'
import { useRouter } from 'next/navigation'
import type { Mission } from '@/data/missions/html'
import confetti from 'canvas-confetti'

interface Props {
  show: boolean
  mission: Mission
  worldId: string
  nextMissionId: string | null
  isLastMission: boolean
  onClose: () => void
}

export default function CelebrationModal({ show, mission, worldId, nextMissionId, isLastMission, onClose }: Props) {
  const { t } = useLocale()
  const router = useRouter()
  const firedRef = useRef(false)

  useEffect(() => {
    if (show && !firedRef.current) {
      firedRef.current = true
      const end = Date.now() + 2000
      const colors = ['#FFD700', '#FF6B35', '#9B59B6', '#00BCD4', '#FF1493']
      const frame = () => {
        confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors })
        confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()
    }
    if (!show) firedRef.current = false
  }, [show])

  const handleNext = () => {
    onClose()
    if (isLastMission) {
      router.push('/')
    } else if (nextMissionId) {
      router.push(`/world/${worldId}/mission/${nextMissionId}`)
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative z-10 w-full max-w-md text-center"
            initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div
              className="rounded-3xl border-2 border-yellow-400/50 p-8"
              style={{ background: 'linear-gradient(135deg, #1a0533 0%, #07011a 100%)' }}
            >
              {/* Lamp */}
              <motion.div
                className="text-6xl mb-3"
                animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                🪔
              </motion.div>

              {/* Title */}
              <motion.h2
                className="font-cinzel text-3xl md:text-4xl font-black text-gold glow-gold mb-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {isLastMission ? t('celebration.worldComplete') : t('celebration.title')}
              </motion.h2>

              <motion.p
                className="text-amber-300 font-nunito text-lg mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {t('celebration.subtitle')}
              </motion.p>

              {/* XP earned */}
              <motion.div
                className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-5 py-2 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                <span className="text-yellow-300 font-nunito font-bold">⚡ +{mission.xp} {t('celebration.xpEarned')}</span>
              </motion.div>

              {/* Key */}
              <motion.div
                className="text-5xl mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              >
                🗝️
              </motion.div>

              {/* Success message */}
              <motion.p
                className="text-white/80 font-nunito text-sm mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {mission.successMessage}
              </motion.p>

              {/* Buttons */}
              <div className="flex gap-3 justify-center flex-wrap">
                <motion.button
                  onClick={handleNext}
                  className="font-nunito font-bold text-black px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-amber-200 transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {isLastMission ? t('celebration.backToMap') : t('celebration.nextMission')}
                </motion.button>

                <motion.button
                  onClick={() => router.push('/')}
                  className="font-nunito font-bold text-white/70 px-6 py-3 rounded-full border border-white/20 hover:border-white/40 hover:text-white transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  {t('celebration.backToMap')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
