'use client'

import { useState, useEffect, useCallback } from 'react'

interface Progress {
  completedMissions: string[]
  xp: number
  unlockedWorlds: string[]
}

const WORLD_ORDER = ['html', 'css', 'javascript', 'react', 'nextjs']
const MISSIONS_PER_WORLD = 8

const defaultProgress: Progress = {
  completedMissions: [],
  xp: 0,
  unlockedWorlds: ['html'],
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(defaultProgress)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('chaabi-progress')
    if (saved) {
      try {
        setProgress(JSON.parse(saved))
      } catch {
        setProgress(defaultProgress)
      }
    }
    setMounted(true)
  }, [])

  const save = useCallback((next: Progress) => {
    setProgress(next)
    localStorage.setItem('chaabi-progress', JSON.stringify(next))
  }, [])

  const completeMission = useCallback((worldId: string, missionId: string, xpReward: number) => {
    setProgress((prev) => {
      const key = `${worldId}-${missionId}`
      if (prev.completedMissions.includes(key)) return prev

      const completedMissions = [...prev.completedMissions, key]
      const xp = prev.xp + xpReward

      const worldMissions = completedMissions.filter((m) => m.startsWith(`${worldId}-`))
      const isWorldComplete = worldMissions.length >= MISSIONS_PER_WORLD

      let unlockedWorlds = [...prev.unlockedWorlds]
      if (isWorldComplete) {
        const nextWorldIndex = WORLD_ORDER.indexOf(worldId) + 1
        if (nextWorldIndex < WORLD_ORDER.length) {
          const nextWorld = WORLD_ORDER[nextWorldIndex]
          if (!unlockedWorlds.includes(nextWorld)) {
            unlockedWorlds = [...unlockedWorlds, nextWorld]
          }
        }
      }

      const next = { completedMissions, xp, unlockedWorlds }
      localStorage.setItem('chaabi-progress', JSON.stringify(next))
      return next
    })
  }, [])

  const isMissionComplete = useCallback((worldId: string, missionId: string) => {
    return progress.completedMissions.includes(`${worldId}-${missionId}`)
  }, [progress.completedMissions])

  const isWorldUnlocked = useCallback((worldId: string) => {
    return progress.unlockedWorlds.includes(worldId)
  }, [progress.unlockedWorlds])

  const getWorldProgress = useCallback((worldId: string) => {
    const done = progress.completedMissions.filter((m) => m.startsWith(`${worldId}-`)).length
    return { done, total: MISSIONS_PER_WORLD, percent: Math.round((done / MISSIONS_PER_WORLD) * 100) }
  }, [progress.completedMissions])

  const totalKeys = progress.completedMissions.length

  return { progress, completeMission, isMissionComplete, isWorldUnlocked, getWorldProgress, totalKeys, mounted }
}
