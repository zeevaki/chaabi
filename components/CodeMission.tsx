'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from '@codesandbox/sandpack-react'
import { useLocale } from '@/context/LocaleContext'
import { useProgress } from '@/hooks/useProgress'
import GenieChat from './GenieChat'
import CelebrationModal from './CelebrationModal'
import type { Mission } from '@/data/missions/html'

interface Props {
  mission: Mission
  worldId: string
  nextMissionId: string | null
  isLastMission: boolean
}

function SubmitButton({
  mission,
  worldId,
  onSuccess,
}: {
  mission: Mission
  worldId: string
  onSuccess: () => void
}) {
  const { sandpack } = useSandpack()
  const { t } = useLocale()
  const { completeMission, isMissionComplete } = useProgress()
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')
  const alreadyDone = isMissionComplete(worldId, mission.id)

  const handleSubmit = () => {
    setChecking(true)
    setError('')
    setTimeout(() => {
      const mainFile = sandpack.files['/index.html'] || sandpack.files[Object.keys(sandpack.files)[0]]
      const code = mainFile?.code || ''
      const passed = mission.validate(code)
      if (passed) {
        completeMission(worldId, mission.id, mission.xp)
        onSuccess()
      } else {
        setError('Not quite! Check your code and try again. The genie can help! 🪔')
      }
      setChecking(false)
    }, 600)
  }

  return (
    <div className="flex flex-col gap-2">
      {error && (
        <motion.p
          className="text-red-400 font-nunito text-base px-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
      {alreadyDone ? (
        <div className="px-5 py-2.5 rounded-full bg-green-500/20 border border-green-400/40 text-green-300 font-nunito font-bold text-sm text-center">
          ✅ Mission Complete!
        </div>
      ) : (
        <motion.button
          onClick={handleSubmit}
          disabled={checking}
          className="px-6 py-3 rounded-full font-nunito font-black text-black bg-gradient-to-r from-yellow-400 to-amber-300 hover:from-yellow-300 hover:to-amber-200 disabled:opacity-50 transition-all shadow-lg text-base"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {checking ? t('mission.checking') : `🗝️ ${t('mission.submit')}`}
        </motion.button>
      )}
    </div>
  )
}

export default function CodeMission({ mission, worldId, nextMissionId, isLastMission }: Props) {
  const { t } = useLocale()
  const [showCelebration, setShowCelebration] = useState(false)

  return (
    <>
      <SandpackProvider
        template="static"
        files={{ '/index.html': mission.starterCode }}
        theme="dark"
        options={{ externalResources: [] }}
      >
        <div className="flex flex-col gap-4 h-full">
          {/* Mission brief */}
          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1">
                <h3 className="font-nunito font-black text-white text-xl leading-tight">{mission.title}</h3>
                <p className="text-yellow-400/80 font-nunito text-sm mt-0.5">{t('mission.objective')}</p>
              </div>
              <div className="flex items-center gap-1 bg-yellow-400/10 rounded-full px-3 py-1.5">
                <span className="text-yellow-300 font-nunito font-bold text-sm">⚡ {mission.xp} XP</span>
              </div>
            </div>

            <div className="bg-black/20 rounded-xl p-4 mb-3">
              <p className="text-purple-300 font-nunito text-sm font-semibold mb-2">{t('mission.concept')}</p>
              <p className="text-white/70 font-nunito text-sm leading-relaxed">{mission.concept}</p>
            </div>

            <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-4">
              <p className="text-yellow-200 font-nunito text-sm font-semibold mb-2">{t('mission.objective')}</p>
              <pre className="text-white/80 font-nunito text-sm leading-relaxed whitespace-pre-wrap">{mission.instruction}</pre>
            </div>
          </motion.div>

          {/* Editor + Preview */}
          <motion.div
            className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-72"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <div className="bg-white/5 px-4 py-2 border-b border-white/10">
                <span className="text-white/50 font-nunito text-sm">index.html</span>
              </div>
              <div style={{ height: '100%', minHeight: '260px' }}>
                <SandpackCodeEditor
                  showLineNumbers
                  showInlineErrors
                  wrapContent
                  style={{ height: '260px' }}
                />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10">
              <div className="bg-white/5 px-4 py-2 border-b border-white/10">
                <span className="text-white/50 font-nunito text-sm">Live Preview</span>
              </div>
              <SandpackPreview style={{ height: '260px' }} showNavigator={false} />
            </div>
          </motion.div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <GenieChat hint={mission.hint} />
            <SubmitButton
              mission={mission}
              worldId={worldId}
              onSuccess={() => setShowCelebration(true)}
            />
          </div>
        </div>
      </SandpackProvider>

      <CelebrationModal
        show={showCelebration}
        mission={mission}
        worldId={worldId}
        nextMissionId={nextMissionId}
        isLastMission={isLastMission}
        onClose={() => setShowCelebration(false)}
      />
    </>
  )
}
