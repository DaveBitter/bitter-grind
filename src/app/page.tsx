"use client"

import { useState } from "react"
import { RatioCalculator } from "@/components/RatioCalculator"
import { BrewingGuide } from "@/components/BrewingGuide"
import { TechniqueLibrary } from "@/components/TechniqueLibrary"
import { RatioChart } from "@/components/charts/RatioChart"
import { TimingChart } from "@/components/charts/TimingChart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coffee, Calculator, Timer, BookOpen, BarChart3, ArrowRight } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { BottomNav } from "@/components/BottomNav"
import { BREWING_METHODS } from "@/lib/brewing-data"

export default function Home() {
  const [activeTab, setActiveTab] = useState("calculator")

  // Shared state for calculator values
  const [calculatorState, setCalculatorState] = useState({
    methodId: BREWING_METHODS[0].id,
    techniqueIndex: 0,
    coffeeAmount: BREWING_METHODS[0].techniques[0].defaultCoffeeAmount,
    ratio: BREWING_METHODS[0].techniques[0].ratio,
  })

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 selection:bg-orange-100 dark:selection:bg-orange-900/30 flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 backdrop-blur-sm sticky top-0 z-50 dark:bg-neutral-950/80 safe-area-inset-top">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white p-1.5 rounded-lg dark:bg-orange-500">
               <Coffee className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-neutral-900 dark:text-white">Bitter</span>{" "}
              <span className="text-orange-500 dark:text-orange-400">Grind</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs font-medium text-neutral-500 uppercase tracking-widest hidden sm:block">
              Precision Brewing
            </div>
            <div className="h-4 w-[1px] bg-neutral-200 dark:bg-neutral-800 hidden sm:block" />
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-16 sm:pb-8">
        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {/* Desktop Tabs */}
            <div className="hidden sm:flex justify-center w-full">
              <TabsList className="h-12 p-1 bg-neutral-100/80 backdrop-blur-sm dark:bg-neutral-900/80 rounded-full border border-neutral-200/50 dark:border-neutral-800/50">
                <TabsTrigger value="calculator" className="rounded-full px-6 h-full data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600 data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-sm dark:data-[state=active]:bg-orange-900/30 dark:data-[state=active]:text-orange-400">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculator
                </TabsTrigger>
                <TabsTrigger value="guide" className="rounded-full px-6 h-full data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600 data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-sm dark:data-[state=active]:bg-orange-900/30 dark:data-[state=active]:text-orange-400">
                  <Timer className="h-4 w-4 mr-2" />
                  Guide
                </TabsTrigger>
                <TabsTrigger value="techniques" className="rounded-full px-6 h-full data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600 data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-sm dark:data-[state=active]:bg-orange-900/30 dark:data-[state=active]:text-orange-400">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Techniques
                </TabsTrigger>
                <TabsTrigger value="data" className="rounded-full px-6 h-full data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600 data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-sm dark:data-[state=active]:bg-orange-900/30 dark:data-[state=active]:text-orange-400">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Data
                </TabsTrigger>
              </TabsList>
            </div>

          <div className="animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
            <TabsContent value="calculator" className="focus-visible:outline-none">
              <RatioCalculator
                calculatorState={calculatorState}
                onCalculatorStateChange={setCalculatorState}
                onNavigateToGuide={() => setActiveTab("guide")}
              />
            </TabsContent>

            <TabsContent value="guide" className="focus-visible:outline-none">
              <BrewingGuide
                calculatorState={calculatorState}
              />
            </TabsContent>

            <TabsContent value="techniques" className="focus-visible:outline-none">
              <TechniqueLibrary />
            </TabsContent>

            <TabsContent value="data" className="focus-visible:outline-none">
              <div className="w-full max-w-4xl mx-auto space-y-12 p-4">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">Data Visualization</h2>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Visualize the science behind the brew.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="p-6 rounded-xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/80 shadow-sm overflow-hidden">
                    <RatioChart />
                  </div>
                  <div className="p-6 rounded-xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-950/80 shadow-sm overflow-hidden">
                    <TimingChart />
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        </div>
      </main>

      {/* Floating Start Brewing Guide Button (Calculator Tab Only) */}
      {activeTab === "calculator" && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 sm:bottom-8">
          <button
            onClick={() => setActiveTab("guide")}
            className="flex items-center gap-2 px-6 py-3 bg-orange-600/90 backdrop-blur-md text-white rounded-full font-medium transition-all hover:bg-orange-700/90 active:scale-95 dark:bg-orange-400/90 dark:text-neutral-900 dark:hover:bg-orange-500/90 shadow-xl hover:shadow-2xl border border-orange-500/20 dark:border-orange-300/20"
          >
            <span>Start Brewing Guide</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Bottom Navigation (Mobile Only) */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
