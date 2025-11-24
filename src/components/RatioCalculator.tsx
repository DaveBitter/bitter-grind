"use client"

import React, { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { BREWING_METHODS } from "@/lib/brewing-data"
import { getSortedBrewingMethods } from "@/lib/brewing-utils"
import { useFavorites } from "@/hooks/useFavorites"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplets, Coffee, Clock, Star } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { TimelineChart } from "@/components/charts/TimelineChart"
import { cn } from "@/lib/utils"

interface CalculatorState {
  methodId: string;
  techniqueIndex: number;
  coffeeAmount: number;
  ratio: number;
}

interface RatioCalculatorProps {
  calculatorState: CalculatorState;
  onCalculatorStateChange: (state: CalculatorState) => void;
  onNavigateToGuide: () => void;
}

export function RatioCalculator({ calculatorState, onCalculatorStateChange, onNavigateToGuide }: RatioCalculatorProps) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const sortedMethods = getSortedBrewingMethods(favorites)

  const [selectedMethodId, setSelectedMethodId] = useState(calculatorState.methodId)
  const [selectedTechniqueIndex, setSelectedTechniqueIndex] = useState(calculatorState.techniqueIndex)
  const selectedMethod = BREWING_METHODS.find(m => m.id === selectedMethodId) || BREWING_METHODS[0]

  const [coffeeAmount, setCoffeeAmount] = useState(calculatorState.coffeeAmount)
  const [ratio, setRatio] = useState(calculatorState.ratio)

  // Update parent state when local state changes
  useEffect(() => {
    onCalculatorStateChange({
      methodId: selectedMethodId,
      techniqueIndex: selectedTechniqueIndex,
      coffeeAmount,
      ratio,
    })
  }, [selectedMethodId, selectedTechniqueIndex, coffeeAmount, ratio, onCalculatorStateChange])

  useEffect(() => {
    // Reset defaults when method changes
    setSelectedTechniqueIndex(0)
    const defaultTechnique = selectedMethod.techniques[0]
    setCoffeeAmount(defaultTechnique.defaultCoffeeAmount)
    setRatio(defaultTechnique.ratio)
  }, [selectedMethodId])

  useEffect(() => {
    // Update defaults when technique changes within the same method
    const technique = selectedMethod.techniques[selectedTechniqueIndex]
    if (technique) {
      setCoffeeAmount(technique.defaultCoffeeAmount)
      setRatio(technique.ratio)
    }
  }, [selectedTechniqueIndex, selectedMethodId])

  const waterAmount = Math.round(coffeeAmount * ratio)

  const chartData = [
    { name: "Coffee", value: coffeeAmount, color: "#f97316" }, // orange-500
    { name: "Water", value: waterAmount, color: "#ffffff" }, // white
  ]

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Ratio Calculator</h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Dial in your perfect brew ratio.
        </p>
      </div>

      <Tabs value={selectedMethodId} onValueChange={setSelectedMethodId} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto no-scrollbar mb-6">
          {sortedMethods.map((method) => (
            <div key={method.id} className="relative inline-block">
              <TabsTrigger
                value={method.id}
                className="min-w-[100px] pr-8"
              >
                {method.name}
              </TabsTrigger>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(method.id)
                }}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 right-1 p-1.5 rounded-full transition-all z-10 touch-manipulation",
                  "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                  "active:scale-95"
                )}
                aria-label={isFavorite(method.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <Star
                  className={cn(
                    "h-3.5 w-3.5 transition-all",
                    isFavorite(method.id)
                      ? "fill-white text-white"
                      : "text-neutral-400"
                  )}
                />
              </button>
            </div>
          ))}
        </TabsList>
      </Tabs>

      {selectedMethod.techniques.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {selectedMethod.techniques.map((tech, idx) => (
            <button
              key={tech.name}
              onClick={() => setSelectedTechniqueIndex(idx)}
              className={`px-4 py-2 text-sm rounded-full border transition-all ${
                selectedTechniqueIndex === idx
                  ? "bg-orange-600 text-white border-orange-600 hover:bg-orange-700 dark:bg-orange-400 dark:text-neutral-900 dark:border-orange-400"
                  : "bg-transparent border-neutral-200 hover:border-orange-200 dark:border-neutral-800 dark:hover:border-orange-900/30"
              }`}
            >
              {tech.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Inputs */}
        <div className="space-y-6 lg:col-span-1">
          <div className="space-y-4 p-6 rounded-xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/80 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-amber-700" />
                <label className="text-sm font-medium">Coffee Input</label>
              </div>
              <span className="text-2xl font-bold tabular-nums">{coffeeAmount}g</span>
            </div>
            <div className="py-4 [&_.slider-track]:bg-orange-500/20 dark:[&_.slider-track]:bg-orange-500/20 [&_.slider-range]:bg-orange-500 dark:[&_.slider-range]:bg-orange-500 [&_.slider-thumb]:border-orange-500 dark:[&_.slider-thumb]:border-orange-500">
              <Slider
                value={[coffeeAmount]}
                onValueChange={(vals) => setCoffeeAmount(vals[0])}
                min={5}
                max={60}
                step={1}
              />
            </div>
            <p className="text-xs text-neutral-500">
              Slide to adjust coffee dose
            </p>
          </div>

          <div className="space-y-4 p-6 rounded-xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/80 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-orange-500" />
                <label className="text-sm font-medium">Water Ratio</label>
              </div>
              <span className="text-xl font-bold tabular-nums">1:{ratio}</span>
            </div>
            <Slider
              value={[ratio]}
              onValueChange={(vals) => setRatio(vals[0])}
              min={1}
              max={25}
              step={0.1}
              className="py-4"
            />
            <p className="text-xs text-neutral-500">
              Adjust brew strength (Lower = Stronger)
            </p>
          </div>
        </div>

        {/* Middle Column - Output & Visualization */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="flex-1 p-6 rounded-xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/80 shadow-sm flex flex-col items-center justify-center">
            <div className="text-center mb-6">
              <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Target Output</h3>
              <div className="text-5xl font-bold tabular-nums text-orange-600 dark:text-orange-400">
                {waterAmount}ml
              </div>
              <p className="text-sm text-neutral-400 mt-1">Total Water Weight</p>
            </div>

            <div className="h-[180px] w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                     formatter={(value: number) => [`${value}g`, '']}
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
              <div className="flex gap-4 text-xs font-medium">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Coffee ({coffeeAmount}g)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-white border border-neutral-300 dark:border-neutral-700"></div>
                <span>Water ({waterAmount}g)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Brew Time */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="flex-1 p-6 rounded-xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/80 shadow-sm flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400 mb-3">
                <Clock className="h-5 w-5" />
                <span className="text-xs font-medium uppercase tracking-wider">Ideal Brew Time</span>
              </div>
              <div className="text-6xl font-bold tabular-nums text-neutral-900 dark:text-neutral-50 mb-2">
                {(() => {
                  const totalSeconds = selectedMethod.techniques[selectedTechniqueIndex].totalTime;
                  const hours = Math.floor(totalSeconds / 3600);
                  const mins = Math.floor((totalSeconds % 3600) / 60);
                  const secs = Math.floor(totalSeconds % 60);

                  // For Cold Brew, show range (12-24h)
                  if (selectedMethodId === "cold-brew") {
                    return "12-24h";
                  }

                  // For times > 1 hour, show hours:minutes format
                  if (hours > 0) {
                    return `${hours}:${mins.toString().padStart(2, '0')}`;
                  }

                  // For times < 1 hour, show minutes:seconds
                  return `${mins}:${secs.toString().padStart(2, '0')}`;
                })()}
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {["cold-brew", "french-press", "aeropress", "clever-dripper"].includes(selectedMethodId)
                  ? "Steeping time"
                  : "Total extraction time"}
              </p>
              {selectedMethodId === "cold-brew" && (
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 italic">
                  Set & forget
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Timeline Chart - Hide for immersion methods */}
      {!["cold-brew", "french-press", "aeropress", "clever-dripper"].includes(selectedMethodId) && (
        <div className="w-full mt-8">
          <div className="p-6 rounded-xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/80 shadow-sm">
            <TimelineChart
              technique={selectedMethod.techniques[selectedTechniqueIndex]}
              totalWater={waterAmount}
            />
          </div>
        </div>
      )}
      {["cold-brew", "french-press", "aeropress", "clever-dripper"].includes(selectedMethodId) && (
        <div className="w-full mt-8">
          <div className="p-6 rounded-xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/80 shadow-sm">
            <div className="text-center py-8">
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                {selectedMethodId === "cold-brew"
                  ? "All water is combined at the start, then the mixture steeps passively for 12-24 hours."
                  : selectedMethodId === "clever-dripper"
                  ? "All water is added at once for full immersion, then the valve opens for filtered drawdown."
                  : "All water is added at once for full immersion brewing, then steeps passively before serving."}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

