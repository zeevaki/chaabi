'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from '@/context/LocaleContext'
import { useProgress } from '@/hooks/useProgress'
import { worlds } from '@/data/worlds'
import LanguageDrawer from './LanguageDrawer'

const WORLD_COLORS: Record<string, string> = {
  html: '#f97316',
  css: '#a855f7',
  javascript: '#eab308',
  react: '#22d3ee',
  nextjs: '#94a3b8',
}

export default function Sidebar() {
  const pathname = usePathname()
  const { t, locale } = useLocale()
  const { progress, isWorldUnlocked, getWorldProgress, totalKeys } = useProgress()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langDrawerOpen, setLangDrawerOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/8">
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <span className="font-cinzel font-black text-2xl text-gold glow-gold tracking-widest">
            CHAABI
          </span>
          <p className="text-white/30 font-nunito text-xs mt-0.5">کھل جا سم سم</p>
        </Link>
      </div>

      {/* Main nav */}
      <nav className="px-3 py-4 space-y-1">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-nunito font-semibold text-sm transition-all ${
            pathname === '/'
              ? 'bg-yellow-400/15 text-yellow-300'
              : 'text-white/60 hover:bg-white/8 hover:text-white'
          }`}
        >
          {t('nav.home')}
        </Link>
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-nunito font-semibold text-sm text-white/60 hover:bg-white/8 hover:text-white transition-all"
        >
          {t('nav.myKeys')}
          {totalKeys > 0 && (
            <span className="ml-auto bg-yellow-400/20 text-yellow-300 text-xs font-bold px-2 py-0.5 rounded-full">
              {totalKeys}
            </span>
          )}
        </Link>

        <button
          onClick={() => setLangDrawerOpen(true)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-nunito font-semibold text-sm text-white/60 hover:bg-white/8 hover:text-white transition-all text-left"
        >
          {t('nav.changeLanguage')}
          <span className="ml-auto text-white/25 font-nunito text-xs uppercase tracking-wider">
            {locale.toUpperCase()}
          </span>
        </button>
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-white/8 mb-3" />

      {/* Worlds list */}
      <div className="px-3 flex-1 overflow-y-auto">
        <p className="px-3 text-white/25 font-nunito text-xs uppercase tracking-wider mb-2">
          Worlds
        </p>
        <div className="space-y-1">
          {worlds.map((world) => {
            const unlocked = isWorldUnlocked(world.id)
            const { done, total, percent } = getWorldProgress(world.id)
            const isActive = pathname.startsWith(`/world/${world.id}`)
            const color = WORLD_COLORS[world.id]

            return (
              <div key={world.id}>
                {unlocked ? (
                  <Link
                    href={`/world/${world.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-white/50 hover:bg-white/8 hover:text-white/80'
                    }`}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: done === total && total > 0 ? '#4ade80' : color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-nunito font-semibold text-xs truncate">
                        {t(`worlds.${world.id}.name`)}
                      </p>
                      {percent > 0 && (
                        <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${percent}%`, backgroundColor: color }}
                          />
                        </div>
                      )}
                    </div>
                    <span className="text-white/30 font-nunito text-xs flex-shrink-0">{done}/{total}</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl opacity-35 cursor-not-allowed">
                    <div className="w-2 h-2 rounded-full bg-white/20 flex-shrink-0" />
                    <p className="font-nunito font-semibold text-xs text-white/40 truncate flex-1">
                      {t(`worlds.${world.id}.name`)}
                    </p>
                    <span className="text-white/20 text-xs">🔒</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom XP stats */}
      <div className="px-4 py-4 border-t border-white/8 mt-auto">
        <div className="bg-white/5 rounded-xl px-4 py-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-white/40 font-nunito text-xs">{t('landing.xpEarned')}</span>
            <span className="text-yellow-300 font-nunito font-bold text-sm">⚡ {progress.xp}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/40 font-nunito text-xs">{t('landing.keysEarned')}</span>
            <span className="text-yellow-300 font-nunito font-bold text-sm">🗝️ {totalKeys}</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <LanguageDrawer open={langDrawerOpen} onClose={() => setLangDrawerOpen(false)} />

      {/* Mobile hamburger */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white/10 border border-white/20 rounded-xl p-2.5 text-white/70 hover:text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
        <div className="w-5 h-0.5 bg-current mb-1" />
        <div className="w-5 h-0.5 bg-current transition-all" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 w-64 z-50 md:hidden border-r border-white/8"
              style={{ background: 'linear-gradient(180deg, #120229 0%, #07011a 100%)' }}
              initial={{ x: -264 }}
              animate={{ x: 0 }}
              exit={{ x: -264 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-60 flex-col border-r border-white/8 z-30"
        style={{ background: 'linear-gradient(180deg, #120229 0%, #07011a 100%)' }}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
