'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import { useProgress } from '@/hooks/useProgress'
import { worlds } from '@/data/worlds'
import { htmlMissions } from '@/data/missions/html'
import { cssMissions } from '@/data/missions/css'
import { jsMissions } from '@/data/missions/javascript'
import StarField from '@/components/StarField'
import Sidebar from '@/components/Sidebar'
import type { Mission } from '@/data/missions/html'

const missionMap: Record<string, Mission[]> = {
  html: htmlMissions,
  css: cssMissions,
  javascript: jsMissions,
}

export default function WorldPage({ params }: { params: Promise<{ worldId: string }> }) {
  const { worldId } = use(params)
  const { t } = useLocale()
  const { isWorldUnlocked, isMissionComplete, getWorldProgress } = useProgress()

  const world = worlds.find((w) => w.id === worldId)
  if (!world) notFound()

  const missions = missionMap[worldId] || []
  const unlocked = isWorldUnlocked(worldId)
  const { done, total } = getWorldProgress(worldId)

  if (!unlocked) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <StarField />
        <Sidebar />
        <div className="relative z-10 text-center md:ml-48">
          <h1 className="font-cinzel text-3xl text-white mb-3">{t('worlds.locked')}</h1>
          <p className="text-white/50 font-nunito mb-6">{t('worlds.completePrevious')}</p>
          <Link href="/" className="font-nunito font-bold text-yellow-300 hover:text-yellow-200 underline">
            {t('mission.backToWorld')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <StarField />
      <Sidebar />

      <main className="relative z-10 md:ml-48 max-w-3xl mx-auto px-4 pb-16 pt-4">
        {/* World header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-cinzel text-3xl md:text-4xl font-black text-white mb-1">
            {t(`worlds.${worldId}.name`)}
          </h1>
          <p className="text-white/50 font-nunito text-sm mb-4">{t(`worlds.${worldId}.desc`)}</p>

          {/* Progress bar */}
          <div className="flex items-center gap-3 justify-center">
            <span className="text-white/40 font-nunito text-xs">{done}/{total}</span>
            <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${world.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${(done / total) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <span className="text-white/40 font-nunito text-xs">{t('worlds.missions')}</span>
          </div>
        </motion.div>

        {/* Mission list */}
        <div className="space-y-3">
          {missions.map((mission, i) => {
            const complete = isMissionComplete(worldId, mission.id)
            const isNext = !complete && (i === 0 || isMissionComplete(worldId, missions[i - 1].id))
            const locked = !complete && !isNext

            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={locked ? '#' : `/world/${worldId}/mission/${mission.id}`}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                    complete
                      ? 'border-green-400/30 bg-green-400/5 hover:bg-green-400/10'
                      : isNext
                      ? `border-${world.border.replace('border-', '')} bg-white/5 hover:bg-white/10 shadow-lg`
                      : 'border-white/8 bg-white/2 opacity-50 cursor-not-allowed'
                  }`}
                  onClick={(e) => locked && e.preventDefault()}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 ${
                    complete ? 'bg-green-400/20' : isNext ? 'bg-yellow-400/20' : 'bg-white/5'
                  }`}>
                    {complete ? '✅' : isNext ? mission.titleEmoji : '🔒'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-nunito font-bold text-sm ${complete ? 'text-green-300' : isNext ? 'text-white' : 'text-white/40'}`}>
                        {t('mission.mission')} {mission.order}: {mission.title}
                      </p>
                      {isNext && (
                        <span className="text-xs bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded-full font-nunito">
                          Next!
                        </span>
                      )}
                    </div>
                    <p className={`font-nunito text-xs mt-0.5 truncate ${complete ? 'text-green-400/60' : 'text-white/40'}`}>
                      {mission.concept.split('!')[0]}
                    </p>
                  </div>

                  <div className={`text-xs font-nunito font-bold flex items-center gap-1 ${complete ? 'text-green-300' : 'text-yellow-400/60'}`}>
                    <span>⚡</span><span>{mission.xp}</span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
