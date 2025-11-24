"use client"

import React, { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BREWING_METHODS } from "@/lib/brewing-data"
import { getSortedBrewingMethods } from "@/lib/brewing-utils"
import { useFavorites } from "@/hooks/useFavorites"
import { useUnits } from "@/hooks/useUnits"
import { formatCoffee, formatTemperature } from "@/lib/unit-conversion"
import { ArrowRight, BookOpen, ChevronDown, ChevronUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TechniqueLibraryProps {
  onNavigateToLearn?: () => void;
}

export function TechniqueLibrary({ onNavigateToLearn }: TechniqueLibraryProps = {}) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { useImperial } = useUnits()
  const sortedMethods = getSortedBrewingMethods(favorites)
  const [expandedTechniques, setExpandedTechniques] = useState<Set<string>>(new Set())

  const toggleTechnique = (methodId: string, techniqueName: string) => {
    const key = `${methodId}-${techniqueName}`
    setExpandedTechniques(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Technique Library</h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          Master the methods behind the magic.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {sortedMethods.map((method) => (
              <AccordionItem key={method.id} value={method.id} className="border-neutral-200 dark:border-neutral-800">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-start gap-4 text-left w-full">
                    <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center aspect-square flex-shrink-0">
                      {/* Ideally dynamic icons here, but for now simple initial */}
                      <span className="font-bold text-lg text-orange-800 dark:text-orange-400">
                        {method.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{method.name}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(method.id)
                          }}
                          className={cn(
                            "p-1.5 rounded-full transition-all touch-manipulation",
                            "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                            "active:scale-95"
                          )}
                          aria-label={isFavorite(method.id) ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Star
                            className={cn(
                              "h-4 w-4 transition-all",
                              isFavorite(method.id)
                                ? "fill-white text-white"
                                : "text-neutral-400"
                            )}
                          />
                        </button>
                      </div>
                      <p className="text-sm text-neutral-500 font-normal hidden sm:block text-left">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6 px-2">
                  <div className="space-y-6">
                    <p className="text-neutral-600 dark:text-neutral-400 sm:hidden">
                      {method.description}
                    </p>

                    <div className="grid gap-4">
                      {method.techniques.map((tech) => {
                        const key = `${method.id}-${tech.name}`
                        const isExpanded = expandedTechniques.has(key)
                        const hasDetails = tech.history || tech.explanation

                        return (
                          <div
                            key={tech.name}
                            className="group rounded-lg border border-neutral-200/50 bg-white/60 backdrop-blur-sm p-4 transition-all hover:border-neutral-400/50 dark:border-neutral-800/50 dark:bg-neutral-950/60 dark:hover:border-neutral-600/50"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{tech.name}</h4>
                              {tech.author && (
                                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full text-orange-800 dark:text-orange-400">
                                  by {tech.author}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-neutral-500 mb-4">
                              {tech.description}
                            </p>

                            {hasDetails && (
                              <div className="space-y-3 mb-4">
                                {isExpanded && (
                                  <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800 pt-3">
                                    {tech.history && (
                                      <div>
                                        <h5 className="font-semibold text-orange-800 dark:text-orange-400 mb-1">History</h5>
                                        <p className="leading-relaxed">{tech.history}</p>
                                      </div>
                                    )}
                                    {tech.explanation && (
                                      <div>
                                        <h5 className="font-semibold text-orange-800 dark:text-orange-400 mb-1">How It Works</h5>
                                        <p className="leading-relaxed">{tech.explanation}</p>
                                      </div>
                                    )}
                                  </div>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleTechnique(method.id, tech.name)}
                                  className="text-xs font-semibold border-2 border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-400 dark:hover:border-orange-600 transition-all shadow-sm hover:shadow h-7 px-3"
                                >
                                  {isExpanded ? (
                                    <>
                                      <ChevronUp className="h-3 w-3 mr-1.5" />
                                      Read Less
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="h-3 w-3 mr-1.5" />
                                      Read More
                                    </>
                                  )}
                                </Button>
                              </div>
                            )}

                            <div className="grid grid-cols-3 gap-2 text-xs text-neutral-500 border-t border-neutral-100 dark:border-neutral-800 pt-3 mb-3">
                               <div>
                                 <span className="block font-bold text-orange-600 dark:text-orange-400">1:{tech.ratio}</span>
                                 Ratio
                               </div>
                               <div>
                                 <span className="block font-bold text-neutral-900 dark:text-neutral-50">{formatCoffee(tech.defaultCoffeeAmount, useImperial)}</span>
                                 Dose
                               </div>
                               <div>
                                 <span className="block font-bold text-neutral-900 dark:text-neutral-50">{(tech.totalTime / 60).toFixed(1)}m</span>
                                 Time
                               </div>
                            </div>
                            <div className="text-xs text-neutral-500 border-t border-neutral-100 dark:border-neutral-800 pt-3">
                              <div className="flex flex-wrap gap-x-4 gap-y-1">
                                <span><strong className="text-neutral-700 dark:text-neutral-300">Grind:</strong> {tech.grindSize}</span>
                                <span><strong className="text-neutral-700 dark:text-neutral-300">Temp:</strong> {formatTemperature(tech.waterTemp, useImperial)}</span>
                              </div>
                              <p className="mt-2 text-neutral-400 dark:text-neutral-500 italic">
                                Best with: Medium to light roasts. {onNavigateToLearn && (
                                  <a
                                    href="#learn"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      onNavigateToLearn();
                                    }}
                                    className="text-orange-600 dark:text-orange-400 hover:underline"
                                  >
                                    Learn more about roasts & beans →
                                  </a>
                                )}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="hidden md:block space-y-6">
          <div className="rounded-xl bg-orange-900/90 backdrop-blur-sm p-6 text-white shadow-lg dark:bg-orange-800/90">
            <BookOpen className="h-8 w-8 mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">Learn the Basics</h3>
            <p className="text-neutral-400 text-sm mb-6">
              Understanding extraction theory is key to brewing better coffee.
            </p>
            <ul className="space-y-3 text-sm text-neutral-300">
               <li className="flex items-start gap-2">
                 <ArrowRight className="h-4 w-4 mt-0.5 shrink-0" />
                 <span><strong>Grind Size:</strong> Affects surface area and flow rate.</span>
               </li>
               <li className="flex items-start gap-2">
                 <ArrowRight className="h-4 w-4 mt-0.5 shrink-0" />
                 <span><strong>Water Temp:</strong> Higher temps extract faster. Light roasts need heat.</span>
               </li>
               <li className="flex items-start gap-2">
                 <ArrowRight className="h-4 w-4 mt-0.5 shrink-0" />
                 <span><strong>Agitation:</strong> Stirring or pouring turbulence increases extraction.</span>
               </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

