import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'cyra-theme'
const THEME_EVENT = 'cyra-theme-change'

function notifyThemeChange(theme: Theme) {
  // Same-tab broadcast so multiple useTheme() callers stay in sync.
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }))
}

export function getTheme(): Theme {
  const v = document.documentElement.dataset.theme
  if (v === 'light' || v === 'dark') return v
  return 'dark'
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // ignore
  }

  // Keep all hooks in sync in the same tab.
  try {
    notifyThemeChange(theme)
  } catch {
    // ignore
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'dark'
    return getTheme()
  })

  useEffect(() => {
    setTheme(theme)
  }, [theme])

  useEffect(() => {
    const onTheme = (e: Event) => {
      const next = (e as CustomEvent).detail as Theme | undefined
      if (next === 'dark' || next === 'light') {
        setThemeState(next)
      }
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      const next = e.newValue === 'light' ? 'light' : 'dark'
      setThemeState(next)
    }

    window.addEventListener(THEME_EVENT, onTheme)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(THEME_EVENT, onTheme)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return {
    theme,
    setTheme: setThemeState,
    toggleTheme: () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
  }
}
