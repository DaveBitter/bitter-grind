import { BREWING_METHODS, BrewingMethod } from "./brewing-data"

export function getSortedBrewingMethods(favorites: Set<string>): BrewingMethod[] {
  const favoriteMethods: BrewingMethod[] = []
  const otherMethods: BrewingMethod[] = []

  BREWING_METHODS.forEach((method) => {
    if (favorites.has(method.id)) {
      favoriteMethods.push(method)
    } else {
      otherMethods.push(method)
    }
  })

  return [...favoriteMethods, ...otherMethods]
}

