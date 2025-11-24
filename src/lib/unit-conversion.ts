// Unit conversion utilities
// All internal calculations use metric, these functions convert for display only

// Coffee: grams ↔ ounces
export function gramsToOunces(grams: number): number {
  return grams / 28.35;
}

export function ouncesToGrams(ounces: number): number {
  return ounces * 28.35;
}

// Water: ml ↔ fl oz
export function mlToFlOz(ml: number): number {
  return ml / 29.57;
}

export function flOzToMl(flOz: number): number {
  return flOz * 29.57;
}

// Temperature: °C ↔ °F
export function celsiusToFahrenheit(celsius: number): number {
  return celsius * 9 / 5 + 32;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5 / 9;
}

// Format functions for display
export function formatCoffee(grams: number, useImperial: boolean): string {
  if (useImperial) {
    const oz = gramsToOunces(grams);
    return `${oz.toFixed(1)}oz`;
  }
  return `${grams.toFixed(grams % 1 === 0 ? 0 : 1)}g`;
}

export function formatWater(ml: number, useImperial: boolean): string {
  if (useImperial) {
    const flOz = mlToFlOz(ml);
    return `${flOz.toFixed(1)}fl oz`;
  }
  return `${Math.round(ml)}ml`;
}

export function formatTemperature(celsius: number, useImperial: boolean): string {
  if (useImperial) {
    const fahrenheit = celsiusToFahrenheit(celsius);
    return `${Math.round(fahrenheit)}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

