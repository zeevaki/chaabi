'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLocale } from '@/context/LocaleContext'
import { htmlMissions } from '@/data/missions/html'
import { cssMissions } from '@/data/missions/css'
import { jsMissions } from '@/data/missions/javascript'
import StarField from '@/components/StarField'
import Sidebar from '@/components/Sidebar'
import CodeMission from '@/components/CodeMission'
import type { Mission } from '@/data/missions/html'

const missionMap: Record<string, Mission[]> = {
  html: htmlMissions,
  css: cssMissions,
  javascript: jsMissions,
}

export default function MissionPage({
  params,
}: {
  params: Promise<{ worldId: string; missionId: string }>
}) {
  const { worldId, missionId } = use(params)
  const { t } = useLocale()

  const missions = missionMap[worldId] || []
  const missionIndex = missions.findIndex((m) => m.id === missionId)
  if (missionIndex === -1) notFound()

  const mission = missions[missionIndex]
  const nextMission = missions[missionIndex + 1] || null
  const isLastMission = missionIndex === missions.length - 1

  return (
    <div className="relative min-h-screen flex flex-col">
      <StarField />
      <Sidebar />

      <div className="md:ml-60 flex flex-col flex-1">
        {/* Top bar */}
        <nav className="relative z-10 flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/8 bg-black/20 backdrop-blur-sm flex-shrink-0">
          <Link
            href={`/world/${worldId}`}
            className="flex items-center gap-1.5 text-white/50 hover:text-white font-nunito text-sm transition-colors"
          >
            ← {t('mission.backToWorld')}
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-white/30 font-nunito text-xs">
              {t('mission.mission')} {mission.order} {t('mission.of')} {missions.length}
            </span>
            <div className="flex gap-1">
              {missions.map((m, i) => (
                <div
                  key={m.id}
                  className={`h-2 rounded-full transition-all ${
                    i === missionIndex
                      ? 'w-4 bg-yellow-400'
                      : i < missionIndex
                      ? 'w-2 bg-green-400'
                      : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </nav>

        {/* Mission header */}
        <motion.div
          className="relative z-10 px-4 md:px-6 pt-5 pb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-cinzel text-xl md:text-2xl font-black text-white">
            {mission.title}
          </h1>
          <p className="text-white/40 font-nunito text-xs mt-0.5">
            {t('mission.mission')} {mission.order} — ⚡ {mission.xp} XP
          </p>
        </motion.div>

        {/* Code mission */}
        <motion.div
          className="relative z-10 flex-1 px-4 md:px-6 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <CodeMission
            mission={mission}
            worldId={worldId}
            nextMissionId={nextMission?.id ?? null}
            isLastMission={isLastMission}
          />
        </motion.div>
      </div>
    </div>
  )
}
