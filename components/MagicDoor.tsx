'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useLocale } from '@/context/LocaleContext'
import { useProgress } from '@/hooks/useProgress'
import type { World } from '@/data/worlds'

interface Props {
  world: World
  index: number
}

const WORLD_COLORS: Record<string, string> = {
  html: 'rgba(249,115,22,0.5)',
  css: 'rgba(168,85,247,0.5)',
  javascript: 'rgba(250,204,21,0.5)',
  react: 'rgba(34,211,238,0.5)',
  nextjs: 'rgba(203,213,225,0.5)',
}

export default function MagicDoor({ world, index }: Props) {
  const router = useRouter()
  const { t } = useLocale()
  const { isWorldUnlocked, getWorldProgress } = useProgress()

  const unlocked = isWorldUnlocked(world.id)
  const { done, total, percent } = getWorldProgress(world.id)
  const glowColor = WORLD_COLORS[world.id]

  const handleClick = () => {
    if (unlocked) router.push(`/world/${world.id}`)
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-3 cursor-pointer group"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      onClick={handleClick}
      whileHover={unlocked ? { scale: 1.04, y: -4 } : {}}
      whileTap={unlocked ? { scale: 0.97 } : {}}
    >
      {/* Door */}
      <div className="relative">
        {/* Glow behind door */}
        {unlocked && (
          <motion.div
            className="absolute inset-0 rounded-t-full blur-xl -z-10"
            style={{ background: glowColor, transform: 'scale(1.3)' }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        )}

        {/* Door shape */}
        <div
          className={`relative w-28 h-44 md:w-32 md:h-52 rounded-t-full border-2 overflow-hidden transition-all duration-300 ${
            unlocked
              ? `${world.border} shadow-2xl ${world.glow}`
              : 'border-white/15'
          }`}
          style={{
            background: unlocked
              ? `linear-gradient(160deg, rgba(30,10,60,0.9) 0%, rgba(10,2,30,0.95) 100%)`
              : 'rgba(10,2,30,0.5)',
          }}
        >
          {/* Door gradient overlay */}
          {unlocked && (
            <div
              className={`absolute inset-0 bg-gradient-to-b ${world.color} opacity-20`}
            />
          )}

          {/* Lock icon for locked doors only, keyhole handled below for unlocked */}
          {!unlocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl opacity-25">🔒</span>
            </div>
          )}

          {/* Progress bar inside door */}
          {unlocked && percent > 0 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-16">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${world.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
            </div>
          )}

          {/* Keyhole */}
          {unlocked && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="w-4 h-4 rounded-full border-2 border-yellow-400/60" />
              <div className="w-1.5 h-3 bg-yellow-400/60 rounded-b-sm mx-auto -mt-0.5" />
            </div>
          )}
        </div>

        {/* Level badge */}
        <div className={`absolute -top-2 -right-2 text-xs font-nunito font-bold px-2 py-0.5 rounded-full ${
          world.level === 1 ? 'bg-amber-500/80 text-black' : 'bg-cyan-500/80 text-black'
        }`}>
          {world.level === 1 ? t('worlds.level1').split(' ')[0] : t('worlds.level2').split(' ')[0]}
        </div>
      </div>

      {/* Door label */}
      <div className="text-center">
        <p className={`font-nunito font-bold text-sm md:text-base transition-colors ${
          unlocked ? 'text-white group-hover:text-yellow-300' : 'text-white/30'
        }`}>
          {t(`worlds.${world.id}.name`)}
        </p>
        <p className={`font-nunito text-xs mt-0.5 ${unlocked ? 'text-white/50' : 'text-white/20'}`}>
          {unlocked
            ? `${done}/${total} ${t('worlds.missions')}`
            : t('worlds.locked')}
        </p>
      </div>
    </motion.div>
  )
}
