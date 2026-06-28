'use client'

import { motion } from 'framer-motion'
import { useLocale } from '@/context/LocaleContext'
import { useProgress } from '@/hooks/useProgress'
import { worlds } from '@/data/worlds'
import LanguagePicker from '@/components/LanguagePicker'
import MagicDoor from '@/components/MagicDoor'
import StarField from '@/components/StarField'
import Sidebar from '@/components/Sidebar'


export default function HomePage() {
  const { t, hasChosen } = useLocale()
  const { mounted } = useProgress()

  if (!mounted) return null
  if (!hasChosen) return <LanguagePicker />

  const track1 = worlds.filter((w) => w.level === 1)
  const track2 = worlds.filter((w) => w.level === 2)

  return (
    <div className="relative min-h-screen">
      <StarField />
      <Sidebar />

      {/* Main content — offset by sidebar width on desktop */}
      <main className="relative z-10 md:ml-60 flex flex-col items-center pt-12 pb-16 px-6">

        {/* Hero text — no icons */}
        <motion.div
          className="text-center mb-12 mt-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-cinzel text-5xl md:text-6xl font-black text-gold glow-gold mb-2">
            {t('landing.tagline')}
          </h1>
          <p className="text-amber-300 font-nunito text-xl font-semibold mb-3">
            {t('landing.subtitle')}
          </p>
          <p className="text-white/50 font-nunito text-sm max-w-md mx-auto">
            {t('landing.description')}
          </p>
        </motion.div>

        {/* Track 1: Foundation */}
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
            <div className="text-center">
              <span className="font-nunito font-black text-amber-400 text-sm uppercase tracking-wider">
                {t('worlds.level1')}
              </span>
              <p className="text-white/40 font-nunito text-xs">{t('landing.track1desc')}</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          </div>

          <div className="flex justify-center gap-4 md:gap-8 mb-12 flex-wrap">
            {track1.map((world, i) => (
              <MagicDoor key={world.id} world={world} index={i} />
            ))}
          </div>

          {/* Track 2: Builder */}
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            <div className="text-center">
              <span className="font-nunito font-black text-cyan-400 text-sm uppercase tracking-wider">
                {t('worlds.level2')}
              </span>
              <p className="text-white/40 font-nunito text-xs">{t('landing.track2desc')}</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          </div>

          <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
            {track2.map((world, i) => (
              <MagicDoor key={world.id} world={world} index={i + 3} />
            ))}
          </div>
        </motion.div>

        <motion.p
          className="text-white/20 font-nunito text-xs mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          chaabi.dev — کھل جا سم سم
        </motion.p>
      </main>
    </div>
  )
}
