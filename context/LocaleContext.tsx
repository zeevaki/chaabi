'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export type Locale = 'en' | 'ur' | 'es' | 'hi' | 'zh' | 'ar'

const RTL_LOCALES: Locale[] = ['ur', 'ar']

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  isRTL: boolean
  hasChosen: boolean
}

const LocaleContext = createContext<LocaleContextType | null>(null)

type Messages = Record<string, unknown>

function getNestedValue(obj: Messages, key: string): string {
  const keys = key.split('.')
  let val: unknown = obj
  for (const k of keys) {
    if (val && typeof val === 'object') {
      val = (val as Messages)[k]
    } else {
      return key
    }
  }
  return typeof val === 'string' ? val : key
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [messages, setMessages] = useState<Messages>({})
  const [hasChosen, setHasChosen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLocale = localStorage.getItem('chaabi-locale') as Locale | null
    const savedChosen = localStorage.getItem('chaabi-chosen') === 'true'
    if (savedLocale && ['en', 'ur', 'es', 'hi', 'zh', 'ar'].includes(savedLocale)) {
      setLocaleState(savedLocale)
    }
    setHasChosen(savedChosen)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    import(`@/i18n/messages/${locale}.json`).then((m) => setMessages(m.default))
    document.documentElement.dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
  }, [locale, mounted])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    setHasChosen(true)
    localStorage.setItem('chaabi-locale', l)
    localStorage.setItem('chaabi-chosen', 'true')
  }, [])

  const t = useCallback((key: string): string => {
    return getNestedValue(messages, key)
  }, [messages])

  if (!mounted) return null

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isRTL: RTL_LOCALES.includes(locale), hasChosen }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
