"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { AuthUser, UserRole } from "@/lib/api/auth"
import { api } from "@/lib/api/client"

type AuthState = {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
}

type AuthContextValue = AuthState & {
  login: (payload: { token: string; user: AuthUser }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = "logistq_auth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
  })

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { user: AuthUser; token: string }
        setState({ user: parsed.user, token: parsed.token, isLoading: false })
        api.defaults.headers.common.Authorization = `Bearer ${parsed.token}`
        return
      }
    } catch {
      // ignore
    }
    setState((prev) => ({ ...prev, isLoading: false }))
  }, [])

  const login = (payload: { token: string; user: AuthUser }) => {
    setState({ user: payload.user, token: payload.token, isLoading: false })
    api.defaults.headers.common.Authorization = `Bearer ${payload.token}`
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }

  const logout = () => {
    setState({ user: null, token: null, isLoading: false })
    delete api.defaults.headers.common.Authorization
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return ctx
}

export function useRole() {
  const { user } = useAuth()
  return user?.role as UserRole | undefined
}

