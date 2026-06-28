'use client'

import { motion } from 'framer-motion'
import { type Locale, useLocale } from '@/context/LocaleContext'
import StarField from './StarField'

const languages: { code: Locale; flag: string; name: string; nativeName: string }[] = [
  { code: 'en', flag: '🇺🇸', name: 'English', nativeName: 'English' },
  { code: 'ur', flag: '🇵🇰', name: 'Urdu', nativeName: 'اردو' },
  { code: 'es', flag: '🇪🇸', name: 'Spanish', nativeName: 'Español' },
  { code: 'hi', flag: '🇮🇳', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'zh', flag: '🇨🇳', name: 'Chinese', nativeName: '中文' },
  { code: 'ar', flag: '🇸🇦', name: 'Arabic', nativeName: 'العربية' },
]

export default function LanguagePicker() {
  const { setLocale } = useLocale()

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <StarField />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Lamp + Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-7xl mb-4 float">🪔</div>
          <h1
            className="font-cinzel text-5xl md:text-6xl font-black text-gold glow-gold mb-2"
            style={{ letterSpacing: '0.05em' }}
          >
            CHAABI
          </h1>
          <p className="text-amber-300 text-lg font-nunito font-semibold">چابی</p>
        </motion.div>

        {/* Select prompt */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white/80 text-xl font-nunito font-semibold">
            🌍 Choose Your Language / اپنی زبان چنیں
          </p>
        </motion.div>

        {/* Language grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {languages.map((lang, i) => (
            <motion.button
              key={lang.code}
              onClick={() => setLocale(lang.code)}
              className="group relative flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-yellow-400/60 transition-all duration-200 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-4xl">{lang.flag}</span>
              <span className="text-xl font-nunito font-bold text-white group-hover:text-yellow-300 transition-colors">
                {lang.nativeName}
              </span>
              <span className="text-sm text-white/50 font-nunito">{lang.name}</span>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'radial-gradient(circle at center, rgba(255,215,0,0.05) 0%, transparent 70%)' }}
              />
            </motion.button>
          ))}
        </div>

        <motion.p
          className="text-center text-white/30 text-sm mt-8 font-nunito"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          You can change this anytime in the app
        </motion.p>
      </div>
    </div>
  )
}
