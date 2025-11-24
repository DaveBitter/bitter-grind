"use client"

import React, { useState } from "react"
import { useUnits } from "@/hooks/useUnits"
import { formatCoffee, formatWater } from "@/lib/unit-conversion"
import { Calculator } from "lucide-react"

interface TDSCalculatorProps {
  compact?: boolean;
}

export function TDSCalculator({ compact = false }: TDSCalculatorProps = {}) {
  const { useImperial } = useUnits()
  const [coffeeWeight, setCoffeeWeight] = useState(20)
  const [waterWeight, setWaterWeight] = useState(320)
  const [tdsReading, setTdsReading] = useState(1.3)
  const [brewWeight, setBrewWeight] = useState(300)

  // Calculate extraction yield and strength
  const extractionYield = brewWeight > 0 && coffeeWeight > 0
    ? ((tdsReading / 100) * brewWeight) / coffeeWeight * 100
    : 0

  const strength = tdsReading

  // Ideal ranges
  const idealExtractionMin = 18
  const idealExtractionMax = 22
  const idealStrengthMin = 1.15
  const idealStrengthMax = 1.45

  const extractionStatus = extractionYield < idealExtractionMin
    ? "under-extracted"
    : extractionYield > idealExtractionMax
    ? "over-extracted"
    : "ideal"

  const strengthStatus = strength < idealStrengthMin
    ? "weak"
    : strength > idealStrengthMax
    ? "strong"
    : "ideal"

  if (compact) {
    return (
      <div className="p-4 rounded-xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-semibold">TDS Calculator</h3>
        </div>
        
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Coffee (g)</label>
              <input
                type="number"
                value={coffeeWeight}
                onChange={(e) => setCoffeeWeight(parseFloat(e.target.value) || 0)}
                min={1}
                max={100}
                step={0.5}
                className="w-full px-2 py-1 text-sm border border-neutral-200 dark:border-neutral-800 rounded bg-transparent font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Brew (ml)</label>
              <input
                type="number"
                value={brewWeight}
                onChange={(e) => setBrewWeight(parseFloat(e.target.value) || 0)}
                min={1}
                max={1000}
                step={10}
                className="w-full px-2 py-1 text-sm border border-neutral-200 dark:border-neutral-800 rounded bg-transparent font-mono"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">TDS (%)</label>
            <input
              type="number"
              value={tdsReading}
              onChange={(e) => setTdsReading(parseFloat(e.target.value) || 0)}
              min={0.5}
              max={3}
              step={0.05}
              className="w-full px-2 py-1 text-sm border border-neutral-200 dark:border-neutral-800 rounded bg-transparent font-mono"
            />
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Extraction</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
              extractionStatus === "ideal"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : extractionStatus === "under-extracted"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}>
              {extractionYield.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-600 dark:text-neutral-400">Strength</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
              strengthStatus === "ideal"
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : strengthStatus === "weak"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}>
              {strength.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Calculator className="h-6 w-6 text-orange-500" />
          <h2 className="text-3xl font-bold tracking-tight">TDS Calculator</h2>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">
          Calculate extraction yield and strength from your TDS reading
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-4 p-6 rounded-xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/80 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Inputs</h3>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Coffee Weight
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={coffeeWeight}
                onChange={(e) => setCoffeeWeight(parseFloat(e.target.value) || 0)}
                min={1}
                max={100}
                step={0.5}
                className="flex-1 px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-transparent text-lg font-mono"
              />
              <span className="text-sm text-neutral-500">{useImperial ? 'oz' : 'g'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Water Weight
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={waterWeight}
                onChange={(e) => setWaterWeight(parseFloat(e.target.value) || 0)}
                min={1}
                max={1000}
                step={10}
                className="flex-1 px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-transparent text-lg font-mono"
              />
              <span className="text-sm text-neutral-500">{useImperial ? 'fl oz' : 'ml'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              TDS Reading (%)
            </label>
            <input
              type="number"
              value={tdsReading}
              onChange={(e) => setTdsReading(parseFloat(e.target.value) || 0)}
              min={0.5}
              max={3}
              step={0.05}
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-transparent text-lg font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Brew Weight (final output)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={brewWeight}
                onChange={(e) => setBrewWeight(parseFloat(e.target.value) || 0)}
                min={1}
                max={1000}
                step={10}
                className="flex-1 px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-transparent text-lg font-mono"
              />
              <span className="text-sm text-neutral-500">{useImperial ? 'fl oz' : 'ml'}</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4 p-6 rounded-xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/80 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Results</h3>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Extraction Yield
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  extractionStatus === "ideal"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : extractionStatus === "under-extracted"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}>
                  {extractionStatus === "ideal" ? "Ideal" : extractionStatus === "under-extracted" ? "Under" : "Over"}
                </span>
              </div>
              <div className="text-4xl font-bold tabular-nums text-neutral-900 dark:text-neutral-50">
                {extractionYield.toFixed(1)}%
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                Ideal: {idealExtractionMin}-{idealExtractionMax}%
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Strength
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  strengthStatus === "ideal"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : strengthStatus === "weak"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}>
                  {strengthStatus === "ideal" ? "Ideal" : strengthStatus === "weak" ? "Weak" : "Strong"}
                </span>
              </div>
              <div className="text-4xl font-bold tabular-nums text-neutral-900 dark:text-neutral-50">
                {strength.toFixed(2)}%
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                Ideal: {idealStrengthMin}-{idealStrengthMax}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          <strong>Formula:</strong> Extraction Yield = (TDS × Brew Weight) / Coffee Weight × 100
        </p>
      </div>
    </div>
  )
}

