import { create } from 'zustand'
import { User } from '../types/User'

interface AuthState {
  token: string | null
  user: User | null
  expiry: number | null
  setAuth: (token: string, user: User, expiresIn: number) => void
  logout: () => void
  scheduleAutoLogout: () => void
  init: () => void
}

let timeoutRef: number | undefined

export const useAuthStore = create<AuthState>((set, get) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: typeof window !== 'undefined' && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  expiry: typeof window !== 'undefined' && localStorage.getItem('expiry') ? Number(localStorage.getItem('expiry')) : null,

  setAuth: (token, user, expiresIn) => {
    const expiry = Date.now() + expiresIn * 1000
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('expiry', expiry.toString())
    set({ token, user, expiry })
    get().scheduleAutoLogout()
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('expiry')
    if (timeoutRef) window.clearTimeout(timeoutRef)
    set({ token: null, user: null, expiry: null })
    // optional: redirect to login
    window.location.href = '/login'
  },

  scheduleAutoLogout: () => {
    if (timeoutRef) window.clearTimeout(timeoutRef)
    const expiry = get().expiry
    if (!expiry) return
    const ms = expiry - Date.now()
    if (ms <= 0) {
      get().logout()
      return
    }
    timeoutRef = window.setTimeout(() => {
      get().logout()
    }, ms)
  },

  init: () => {
    const expiry = localStorage.getItem('expiry')
    if (expiry && Date.now() > Number(expiry)) {
      get().logout()
    } else {
      // schedule if valid
      get().scheduleAutoLogout()
    }
  }
}))