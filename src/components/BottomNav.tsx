"use client"

import { Calculator, Timer, BookOpen, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "calculator", icon: Calculator, label: "Calculator" },
  { id: "guide", icon: Timer, label: "Guide" },
  { id: "techniques", icon: BookOpen, label: "Techniques" },
  { id: "data", icon: BarChart3, label: "Data" },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 backdrop-blur-md dark:bg-neutral-950/95 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]">
      <div className="grid grid-cols-4 h-16 safe-area-inset-bottom">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center justify-center transition-all active:scale-95",
                isActive
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-neutral-500 dark:text-neutral-400"
              )}
              aria-label={tab.label}
            >
              <Icon className={cn(
                "h-6 w-6 transition-all",
                isActive && "scale-110"
              )} />
            </button>
          )
        })}
      </div>
    </nav>
  )
}

