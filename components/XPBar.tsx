'use client'

import { motion } from 'framer-motion'
import { useLocale } from '@/context/LocaleContext'
import { useProgress } from '@/hooks/useProgress'

export default function XPBar() {
  const { t } = useLocale()
  const { progress, totalKeys } = useProgress()

  const maxXP = 3200
  const percent = Math.min((progress.xp / maxXP) * 100, 100)

  return (
    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-5 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className="text-lg">🗝️</span>
        <span className="text-yellow-300 font-nunito font-bold text-sm">{totalKeys}</span>
        <span className="text-white/40 font-nunito text-xs">{t('landing.keysEarned')}</span>
      </div>
      <div className="w-px h-4 bg-white/20" />
      <div className="flex items-center gap-2">
        <span className="text-yellow-400 font-nunito font-bold text-sm">⚡ {progress.xp}</span>
        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-300"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <span className="text-white/40 font-nunito text-xs">{t('landing.xpEarned')}</span>
      </div>
    </div>
  )
}
