'use client'

import { motion } from 'framer-motion'
import { useLocale } from '@/context/LocaleContext'
import { useProgress } from '@/hooks/useProgress'
import { worlds } from '@/data/worlds'
import MagicDoor from '@/components/MagicDoor'
import Sidebar from '@/components/Sidebar'
import HeroAnimation from '@/components/HeroAnimation'

export default function HomePage() {
  const { t } = useLocale()
  const { mounted } = useProgress()

  if (!mounted) return null

  const track1 = worlds.filter((w) => w.level === 1)
  const track2 = worlds.filter((w) => w.level === 2)

  const scrollToWorlds = () => {
    document.getElementById('worlds')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <Sidebar />

      {/* Full-screen hero animation — sidebar floats above it */}
      <HeroAnimation onStart={scrollToWorlds} />

      {/* World doors — shifted right of sidebar on desktop */}
      <main
        id="worlds"
        className="relative z-10 md:ml-48 flex flex-col items-center pt-16 pb-20 px-6"
        style={{ background: 'linear-gradient(180deg, #0b0726 0%, #080518 100%)' }}
      >
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Track 1: Foundation */}
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

          <div className="flex justify-center gap-4 md:gap-8 mb-14 flex-wrap">
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
          className="text-white/20 font-nunito text-xs mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          chaabi.dev — کھل جا سم سم
        </motion.p>
      </main>
    </div>
  )
}
