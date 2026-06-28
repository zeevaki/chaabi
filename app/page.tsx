'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale, type Locale } from '@/context/LocaleContext'
import { useProgress } from '@/hooks/useProgress'
import { worlds } from '@/data/worlds'
import LanguagePicker from '@/components/LanguagePicker'
import MagicDoor from '@/components/MagicDoor'
import StarField from '@/components/StarField'
import XPBar from '@/components/XPBar'

const languages: { code: Locale; flag: string; native: string }[] = [
  { code: 'en', flag: '🇺🇸', native: 'EN' },
  { code: 'ur', flag: '🇵🇰', native: 'اردو' },
  { code: 'es', flag: '🇪🇸', native: 'ES' },
  { code: 'hi', flag: '🇮🇳', native: 'हि' },
  { code: 'zh', flag: '🇨🇳', native: '中' },
  { code: 'ar', flag: '🇸🇦', native: 'ع' },
]

export default function HomePage() {
  const { t, hasChosen, locale, setLocale } = useLocale()
  const { mounted } = useProgress()
  const [showLangMenu, setShowLangMenu] = useState(false)

  if (!mounted) return null
  if (!hasChosen) return <LanguagePicker />

  const track1 = worlds.filter((w) => w.level === 1)
  const track2 = worlds.filter((w) => w.level === 2)

  return (
    <div className="relative min-h-screen">
      <StarField />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🪔</span>
          <span className="font-cinzel font-black text-gold text-xl glow-gold">CHAABI</span>
        </div>
        <div className="flex items-center gap-3">
          <XPBar />
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-nunito text-sm transition-all"
            >
              <span>{languages.find((l) => l.code === locale)?.flag}</span>
              <span className="hidden sm:inline">{languages.find((l) => l.code === locale)?.native}</span>
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-white/15 bg-[#1a0533]/95 backdrop-blur-md py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLocale(lang.code); setShowLangMenu(false) }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-nunito hover:bg-white/10 transition-colors ${
                      locale === lang.code ? 'text-yellow-300' : 'text-white/70'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center pt-6 pb-16 px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🪔
          </motion.div>
          <h1 className="font-cinzel text-5xl md:text-7xl font-black text-gold glow-gold mb-2">
            {t('landing.tagline')}
          </h1>
          <p className="text-amber-300 font-nunito text-xl md:text-2xl font-semibold mb-3">
            {t('landing.subtitle')}
          </p>
          <p className="text-white/50 font-nunito text-sm max-w-md mx-auto">
            {t('landing.description')}
          </p>
        </motion.div>

        {/* Track 1: Foundation */}
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent max-w-32" />
            <div className="text-center">
              <span className="font-nunito font-black text-amber-400 text-sm uppercase tracking-wider">
                {t('worlds.level1')}
              </span>
              <p className="text-white/40 font-nunito text-xs">{t('landing.track1desc')}</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent max-w-32" />
          </div>

          <div className="flex justify-center gap-4 md:gap-8 mb-12 flex-wrap">
            {track1.map((world, i) => (
              <MagicDoor key={world.id} world={world} index={i} />
            ))}
          </div>

          {/* Track 2: Builder */}
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent max-w-32" />
            <div className="text-center">
              <span className="font-nunito font-black text-cyan-400 text-sm uppercase tracking-wider">
                {t('worlds.level2')}
              </span>
              <p className="text-white/40 font-nunito text-xs">{t('landing.track2desc')}</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent max-w-32" />
          </div>

          <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
            {track2.map((world, i) => (
              <MagicDoor key={world.id} world={world} index={i + 3} />
            ))}
          </div>
        </motion.div>

        {/* Footer tagline */}
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
