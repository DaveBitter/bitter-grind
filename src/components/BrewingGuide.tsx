"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Timer } from "@/components/Timer"
import { BREWING_METHODS, BrewingTechnique } from "@/lib/brewing-data"
import { getSortedBrewingMethods } from "@/lib/brewing-utils"
import { useFavorites } from "@/hooks/useFavorites"
import { useUnits } from "@/hooks/useUnits"
import { formatCoffee, formatWater, formatTemperature } from "@/lib/unit-conversion"
import { TDSCalculator } from "@/components/TDSCalculator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Droplets, Thermometer, Clock, Scale, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalculatorState {
  methodId: string;
  techniqueIndex: number;
  coffeeAmount: number;
  ratio: number;
}

interface BrewingGuideProps {
  calculatorState?: CalculatorState;
  initialMethodId?: string;
  initialTechniqueIndex?: number;
}

export function BrewingGuide({ calculatorState, initialMethodId, initialTechniqueIndex }: BrewingGuideProps) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { useImperial } = useUnits()
  const sortedMethods = getSortedBrewingMethods(favorites)

  const [selectedMethodId, setSelectedMethodId] = useState(
    initialMethodId || calculatorState?.methodId || BREWING_METHODS[0].id
  )
  const [selectedTechniqueIndex, setSelectedTechniqueIndex] = useState(
    initialTechniqueIndex ?? calculatorState?.techniqueIndex ?? 0
  )
  const [currentTime, setCurrentTime] = useState(0)

  // Sync with calculator state when it changes
  useEffect(() => {
    if (calculatorState) {
      setSelectedMethodId(calculatorState.methodId)
      setSelectedTechniqueIndex(calculatorState.techniqueIndex)
    }
  }, [calculatorState])

  const selectedMethod = BREWING_METHODS.find(m => m.id === selectedMethodId) || BREWING_METHODS[0]
  const baseTechnique = selectedMethod.techniques[selectedTechniqueIndex] || selectedMethod.techniques[0]

  // Calculate scale factor if using custom ratio
  const customCoffeeAmount = calculatorState?.coffeeAmount || baseTechnique.defaultCoffeeAmount
  const customRatio = calculatorState?.ratio || baseTechnique.ratio
  const defaultTotalWater = baseTechnique.defaultCoffeeAmount * baseTechnique.ratio
  const customTotalWater = customCoffeeAmount * customRatio
  const scaleFactor = customTotalWater / defaultTotalWater

  // Create adjusted technique with scaled water amounts
  const selectedTechnique = useMemo(() => ({
    ...baseTechnique,
    defaultCoffeeAmount: customCoffeeAmount,
    ratio: customRatio,
    steps: baseTechnique.steps.map(step => ({
      ...step,
      waterAmount: step.waterAmount ? Math.round(step.waterAmount * scaleFactor) : undefined
    }))
  }), [baseTechnique, customCoffeeAmount, customRatio, scaleFactor])

  // Identify the current step based on time
  const currentStepIndex = useMemo(() => {
    // Find the step that should be active at currentTime
    // When multiple steps share the same time, show the first one
    // When time is between steps, show the last completed step

    for (let i = selectedTechnique.steps.length - 1; i >= 0; i--) {
      const step = selectedTechnique.steps[i];

      // Find the last step where currentTime >= step.time
      if (currentTime >= step.time) {
        // If this step and previous step have same time, go back to find the first one
        let firstStepAtThisTime = i;
        while (firstStepAtThisTime > 0 &&
               selectedTechnique.steps[firstStepAtThisTime - 1].time === step.time) {
          firstStepAtThisTime--;
        }
        return firstStepAtThisTime;
      }
    }

    // If we haven't reached any step yet, show the first one
    return 0;
  }, [currentTime, selectedTechnique.steps]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Brewing Guide</h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Step-by-step precision for the perfect cup.
        </p>
      </div>

      <Tabs value={selectedMethodId} onValueChange={(val) => { setSelectedMethodId(val); setSelectedTechniqueIndex(0); setCurrentTime(0); }} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto no-scrollbar mb-8">
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

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div className="space-y-8">
             {/* Technique Selector */}
             {selectedMethod.techniques.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  {selectedMethod.techniques.map((tech, idx) => (
                    <button
                      key={tech.name}
                      onClick={() => { setSelectedTechniqueIndex(idx); setCurrentTime(0); }}
                      className={cn(
                        "px-4 py-2 text-sm rounded-full border transition-all",
                        selectedTechniqueIndex === idx
                          ? "bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-50 dark:text-neutral-900"
                          : "bg-transparent border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
                      )}
                    >
                      {tech.name}
                    </button>
                  ))}
                </div>
             )}

             <div className="p-6 rounded-xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/80 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100/50 dark:border-neutral-800/50 pb-6">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedTechnique.name}</h3>
                    <p className="text-neutral-500">{selectedTechnique.description}</p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex flex-col items-center">
                      <Scale className="h-4 w-4 mb-1 text-neutral-400" />
                      <span className="font-mono">{formatCoffee(selectedTechnique.defaultCoffeeAmount, useImperial)}</span>
                    </div>
                    <div className="flex flex-col items-center">
                       <Droplets className="h-4 w-4 mb-1 text-orange-400" />
                       <span className="font-mono">1:{selectedTechnique.ratio.toFixed(2)}</span>
                    </div>
                     <div className="flex flex-col items-center">
                       <Thermometer className="h-4 w-4 mb-1 text-red-400" />
                       <span className="font-mono">{formatTemperature(selectedTechnique.waterTemp, useImperial)}</span>
                    </div>
                     <div className="flex flex-col items-center">
                       <Clock className="h-4 w-4 mb-1 text-neutral-400" />
                       <span className="font-mono">{(selectedTechnique.totalTime / 60).toFixed(1)}m</span>
                    </div>
                  </div>
                </div>

                {/* Steps List */}
                <div className="space-y-4">
                  {selectedTechnique.steps.map((step, idx) => {
                     const isActive = idx === currentStepIndex;
                     const isPast = idx < currentStepIndex;

                     return (
                       <div
                          key={idx}
                          className={cn(
                            "relative pl-8 py-2 transition-opacity duration-300",
                            isActive ? "opacity-100" : isPast ? "opacity-50" : "opacity-40"
                          )}
                       >
                          {/* Timeline line */}
                          <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-neutral-100 dark:bg-neutral-800"></div>
                          {/* Dot */}
                          <div className={cn(
                            "absolute left-0 top-[14px] h-6 w-6 rounded-full border-2 flex items-center justify-center bg-white dark:bg-neutral-950 z-10 transition-colors",
                            isActive ? "border-orange-500 text-orange-500" : isPast ? "border-neutral-300 text-neutral-300" : "border-neutral-200 text-neutral-200"
                          )}>
                            <span className="text-[10px] font-bold">{idx + 1}</span>
                          </div>

                          <div className="flex justify-between items-start">
                            <div>
                              <p className={cn("font-medium text-lg", isActive && "text-orange-600 dark:text-orange-400")}>
                                {step.description}
                              </p>
                              <span className="text-xs font-mono text-neutral-400">
                                @ {Math.floor(step.time / 60)}:{Math.floor(step.time % 60).toString().padStart(2, '0')}
                              </span>
                            </div>
                            {step.waterAmount && (
                              <div className="bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300 px-2 py-1 rounded text-xs font-mono font-bold">
                                {step.waterAmount ? formatWater(step.waterAmount, useImperial) : ''}
                              </div>
                            )}
                          </div>
                       </div>
                     )
                  })}
                </div>
             </div>
          </div>

          {/* Timer Column */}
          <div className="lg:sticky lg:top-8 space-y-6">
            <div className="p-8 rounded-2xl bg-neutral-900/90 backdrop-blur-sm text-white shadow-2xl dark:bg-neutral-800/90 dark:border dark:border-neutral-700/50">
               <Timer
                 totalTime={selectedTechnique.totalTime}
                 onTick={setCurrentTime}
               />
            </div>

            <div className="p-4 rounded-xl bg-orange-50/80 backdrop-blur-sm border border-orange-100/50 dark:bg-orange-900/20 dark:border-orange-900/30">
               <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2 flex items-center gap-2">
                 <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                 Current Action
               </h4>
               <p className="text-lg font-medium text-orange-800 dark:text-orange-200">
                 {selectedTechnique.steps[currentStepIndex]?.description || "Get ready..."}
               </p>
               {selectedTechnique.steps[currentStepIndex]?.waterAmount && (
                  <div className="mt-2 text-3xl font-bold text-orange-600 dark:text-orange-400 tabular-nums">
                    → {selectedTechnique.steps[currentStepIndex].waterAmount ? formatWater(selectedTechnique.steps[currentStepIndex].waterAmount, useImperial) : ''}
                  </div>
               )}
            </div>

            {/* TDS Calculator */}
            <div className="mt-6">
              <TDSCalculator compact={true} />
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

