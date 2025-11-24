"use client"

import * as React from "react"
import { useUnits } from "@/hooks/useUnits"

export function UnitToggle() {
  const { useImperial, toggleUnits } = useUnits()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="relative rounded-md p-2 w-10 h-10 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        aria-label="Toggle units"
        disabled
      >
        <span className="text-xs font-medium">g</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleUnits}
      className="relative rounded-md p-2 w-10 h-10 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      aria-label={`Switch to ${useImperial ? 'metric' : 'imperial'} units`}
      title={`Current: ${useImperial ? 'Imperial' : 'Metric'}`}
    >
      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
        {useImperial ? 'oz' : 'g'}
      </span>
    </button>
  )
}

