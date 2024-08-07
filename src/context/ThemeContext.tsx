"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system"

type ThemeProviderProsps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

type ThemeProviderState = {
  theme: Theme,
  setTheme: (theme: Theme) => void,
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "stock-manager-theme",
  ...props
}: ThemeProviderProsps) => {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    const storage = window.localStorage.getItem(storageKey) as Theme || defaultTheme
    setTheme(storage);
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-colors-scheme:dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("")
  }
  return context
}