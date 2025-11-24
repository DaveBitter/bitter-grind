"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="relative rounded-md p-2 w-10 h-10 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="h-[1.2rem] w-[1.2rem] absolute inset-0 m-auto" />
      </button>
    )
  }

  const toggleTheme = () => {
    // Use resolvedTheme to handle system preference
    const currentTheme = resolvedTheme || theme
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  const isDark = (resolvedTheme || theme) === "dark"

  return (
    <button
      onClick={toggleTheme}
      className="relative rounded-md p-2 w-10 h-10 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] absolute inset-0 m-auto transition-all ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
      <Moon className={`h-[1.2rem] w-[1.2rem] absolute inset-0 m-auto transition-all ${isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} />
    </button>
  )
}

