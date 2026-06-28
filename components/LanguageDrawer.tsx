'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { type Locale, useLocale } from '@/context/LocaleContext'

const languages: { code: Locale; flag: string; nativeName: string; englishName: string }[] = [
  { code: 'en', flag: '🇺🇸', nativeName: 'English', englishName: 'English' },
  { code: 'ur', flag: '🇵🇰', nativeName: 'اردو', englishName: 'Urdu' },
  { code: 'es', flag: '🇪🇸', nativeName: 'Español', englishName: 'Spanish' },
  { code: 'hi', flag: '🇮🇳', nativeName: 'हिंदी', englishName: 'Hindi' },
  { code: 'zh', flag: '🇨🇳', nativeName: '中文', englishName: 'Chinese' },
  { code: 'ar', flag: '🇸🇦', nativeName: 'العربية', englishName: 'Arabic' },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function LanguageDrawer({ open, onClose }: Props) {
  const { locale, setLocale } = useLocale()

  const handleSelect = (code: Locale) => {
    setLocale(code)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 left-0 bottom-0 z-50 w-72 flex flex-col border-r border-white/10"
            style={{ background: 'linear-gradient(180deg, #1a0533 0%, #0a0118 100%)' }}
            initial={{ x: -288 }}
            animate={{ x: 0 }}
            exit={{ x: -288 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div>
                <h2 className="font-cinzel font-black text-gold text-lg">Language</h2>
                <p className="text-white/30 font-nunito text-xs mt-0.5">زبان چنیں</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all"
              >
                ✕
              </button>
            </div>

            {/* Language options */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              {languages.map((lang, i) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border transition-all text-left ${
                    locale === lang.code
                      ? 'border-yellow-400/50 bg-yellow-400/10'
                      : 'border-white/8 bg-white/3 hover:bg-white/8 hover:border-white/20'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="text-3xl">{lang.flag}</span>
                  <div className="flex-1">
                    <p className={`font-nunito font-bold text-base ${
                      locale === lang.code ? 'text-yellow-300' : 'text-white'
                    }`}>
                      {lang.nativeName}
                    </p>
                    <p className="text-white/35 font-nunito text-xs">{lang.englishName}</p>
                  </div>
                  {locale === lang.code && (
                    <span className="text-yellow-400 text-lg">✓</span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/8">
              <p className="text-white/20 font-nunito text-xs text-center">
                chaabi.dev
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
