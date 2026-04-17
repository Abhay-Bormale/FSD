"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type AppLanguage = "en" | "hi" | "mr"

type PreferencesState = {
  language: AppLanguage
}

type PreferencesContextValue = PreferencesState & {
  setLanguage: (lang: AppLanguage) => void
}

const PreferencesContext = createContext<PreferencesContextValue | undefined>(
  undefined
)

const STORAGE_KEY_LANGUAGE = "logistq_language"

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>("en")

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY_LANGUAGE)
    if (saved === "en" || saved === "hi" || saved === "mr") {
      setLanguageState(saved)
      document.documentElement.lang = saved
    } else {
      document.documentElement.lang = "en"
    }
  }, [])

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang)
    window.localStorage.setItem(STORAGE_KEY_LANGUAGE, lang)
    document.documentElement.lang = lang
  }

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider")
  return ctx
}

