'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from '@/context/LocaleContext'

interface Message {
  role: 'user' | 'genie'
  text: string
}

export default function GenieChat({ hint }: { hint: string }) {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const res = await fetch('/api/genie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'genie', text: data.reply || t('genie.offline') }])
    } catch {
      setMessages((prev) => [...prev, { role: 'genie', text: t('genie.offline') }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* Lamp button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-yellow-400/30 bg-yellow-400/5 hover:bg-yellow-400/10 hover:border-yellow-400/60 transition-all font-nunito font-bold text-yellow-300 text-sm"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <motion.span
          animate={open ? { rotate: [0, -15, 15, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          🪔
        </motion.span>
        {t('genie.title')}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-full mb-3 left-0 w-80 rounded-2xl border border-white/15 overflow-hidden z-30"
            style={{ background: 'linear-gradient(135deg, #1a0533 0%, #07011a 100%)' }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <span className="text-xl float-slow">🧞</span>
              <span className="font-nunito font-bold text-yellow-300 text-sm">{t('genie.title')}</span>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto text-white/40 hover:text-white/80 text-lg"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="h-52 overflow-y-auto p-3 space-y-2">
              {messages.length === 0 && (
                <div className="flex gap-2">
                  <span className="text-xl">🧞</span>
                  <div className="bg-white/8 rounded-xl rounded-tl-sm px-3 py-2 text-sm text-white/80 font-nunito">
                    {t('genie.greeting')}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'genie' && <span className="text-lg">🧞</span>}
                  <div className={`rounded-xl px-3 py-2 text-sm font-nunito max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-yellow-400/20 text-yellow-100 rounded-tr-sm'
                      : 'bg-white/8 text-white/80 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <span className="text-lg">🧞</span>
                  <div className="bg-white/8 rounded-xl rounded-tl-sm px-3 py-2 text-sm text-white/50 font-nunito italic">
                    {t('genie.thinking')}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Hint shortcut */}
            {!showHint && (
              <div className="px-3 pb-2">
                <button
                  onClick={() => {
                    setShowHint(true)
                    setMessages((prev) => [...prev, { role: 'genie', text: `💡 ${hint}` }])
                  }}
                  className="text-xs text-yellow-400/60 hover:text-yellow-400 font-nunito underline transition-colors"
                >
                  {t('mission.hint')}
                </button>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-white/10 flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={t('genie.placeholder')}
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 font-nunito outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-4 text-yellow-400 hover:text-yellow-300 disabled:text-white/20 font-nunito font-bold text-sm transition-colors"
              >
                {t('genie.send')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
