"use client"

import { useState, useEffect } from "react"

const FAVORITES_STORAGE_KEY = "bitter-grind-favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Load favorites from localStorage on mount
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (stored) {
        setFavorites(new Set(JSON.parse(stored)))
      }
    } catch (error) {
      console.error("Failed to load favorites:", error)
    }
  }, [])

  const toggleFavorite = (methodId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(methodId)) {
        newFavorites.delete(methodId)
      } else {
        newFavorites.add(methodId)
      }

      // Save to localStorage
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(newFavorites)))
      } catch (error) {
        console.error("Failed to save favorites:", error)
      }

      return newFavorites
    })
  }

  const isFavorite = (methodId: string) => favorites.has(methodId)

  return { favorites, toggleFavorite, isFavorite }
}

