"use client"

import React, { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, Lightbulb, AlertTriangle, CheckCircle } from "lucide-react"

interface ExtractionTheoryProps {
  onNavigateToCalculator?: () => void;
}

export function ExtractionTheory({ onNavigateToCalculator }: ExtractionTheoryProps = {}) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="h-6 w-6 text-orange-500" />
          <h2 className="text-3xl font-bold tracking-tight">Extraction Theory</h2>
        </div>
        <p className="text-neutral-500 dark:text-neutral-400">
          Understanding the science behind great coffee
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="what-is-extraction" className="border border-neutral-200/50 dark:border-neutral-800/50 rounded-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-950/80 shadow-sm px-6">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-5 w-5 text-orange-500" />
              <span className="text-lg font-semibold">What is Extraction?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
              <p>
                Extraction is the process of dissolving soluble compounds from coffee grounds into water.
                When hot water comes into contact with coffee, it extracts various compounds including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Acids</strong> - Bright, fruity flavors (extract first)</li>
                <li><strong>Sugars</strong> - Sweetness and body (extract in the middle)</li>
                <li><strong>Oils</strong> - Richness and mouthfeel (extract later)</li>
                <li><strong>Bitter compounds</strong> - Bitterness and astringency (extract last)</li>
              </ul>
              <p>
                The goal is to extract the desirable compounds (acids, sugars, oils) while minimizing
                the extraction of bitter compounds. This balance is achieved through careful control of
                grind size, water temperature, brew time, and agitation.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="extraction-yield" className="border border-neutral-200/50 dark:border-neutral-800/50 rounded-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-950/80 shadow-sm px-6">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-orange-500" />
              <span className="text-lg font-semibold">Extraction Yield & TDS</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
              <p>
                <strong>Total Dissolved Solids (TDS)</strong> measures the concentration of dissolved
                compounds in your brewed coffee, expressed as a percentage. A typical coffee has a TDS
                of 1.15% to 1.45%.
              </p>
              <p>
                <strong>Extraction Yield</strong> measures what percentage of the coffee grounds was
                extracted into the final brew. The ideal extraction yield is between 18% and 22%.
              </p>
              <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <p className="font-mono text-sm">
                  <strong>Formula:</strong> Extraction Yield = (TDS × Brew Weight) / Coffee Weight × 100
                </p>
              </div>
              <p>
                Use our {onNavigateToCalculator ? (
                  <a
                    href="#calculator"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateToCalculator();
                    }}
                    className="text-orange-600 dark:text-orange-400 underline hover:text-orange-700 dark:hover:text-orange-300"
                  >
                    TDS Calculator
                  </a>
                ) : (
                  <span className="text-orange-600 dark:text-orange-400">TDS Calculator</span>
                )} to measure your extraction yield and ensure you're in the ideal range.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="under-over" className="border border-neutral-200/50 dark:border-neutral-800/50 rounded-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-950/80 shadow-sm px-6">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span className="text-lg font-semibold">Under-Extraction vs Over-Extraction</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Under-Extraction (&lt;18%)</h4>
                <p className="mb-2">Not enough compounds extracted from the coffee grounds.</p>
                <p className="text-sm"><strong>Signs:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Sour, acidic taste</li>
                  <li>Weak, watery body</li>
                  <li>Lacks sweetness</li>
                  <li>Quick, thin finish</li>
                </ul>
                <p className="text-sm mt-2"><strong>Solutions:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Finer grind size</li>
                  <li>Higher water temperature</li>
                  <li>Longer brew time</li>
                  <li>More agitation</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Over-Extraction (&gt;22%)</h4>
                <p className="mb-2">Too many compounds extracted, including bitter ones.</p>
                <p className="text-sm"><strong>Signs:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Bitter, astringent taste</li>
                  <li>Dry, chalky mouthfeel</li>
                  <li>Harsh finish</li>
                  <li>Lacks complexity</li>
                </ul>
                <p className="text-sm mt-2"><strong>Solutions:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Coarser grind size</li>
                  <li>Lower water temperature</li>
                  <li>Shorter brew time</li>
                  <li>Less agitation</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Ideal Extraction (18-22%)</h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Balanced extraction brings out the best in your coffee: bright acidity,
                  natural sweetness, rich body, and complex flavors without bitterness.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="factors" className="border border-neutral-200/50 dark:border-neutral-800/50 rounded-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-950/80 shadow-sm px-6">
          <AccordionTrigger className="hover:no-underline">
            <span className="text-lg font-semibold">Factors Affecting Extraction</span>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">1. Grind Size</h4>
                <p className="text-sm">
                  Finer grinds increase surface area, leading to faster extraction. Coarser grinds
                  extract more slowly. Match your grind to your brew method and time.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">2. Water Temperature</h4>
                <p className="text-sm">
                  Hotter water extracts faster and more completely. Most methods use 90-100°C (195-212°F).
                  Lower temperatures can result in under-extraction, while very high temperatures can
                  extract unwanted bitter compounds.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">3. Brew Time</h4>
                <p className="text-sm">
                  Longer contact time allows more extraction. Immersion methods (French Press, Cold Brew)
                  have longer times, while pour-over methods have shorter, controlled times. Balance
                  time with other factors.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">4. Agitation</h4>
                <p className="text-sm">
                  Stirring, swirling, or pouring patterns create turbulence that increases extraction.
                  Too much agitation can cause over-extraction, while too little can lead to channeling
                  and uneven extraction.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">5. Coffee-to-Water Ratio</h4>
                <p className="text-sm">
                  The ratio affects strength (concentration) more than extraction percentage, but it
                  influences how easily compounds extract. More coffee relative to water can slow
                  extraction, while less coffee can speed it up.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="grind-size" className="border border-neutral-200/50 dark:border-neutral-800/50 rounded-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-950/80 shadow-sm px-6">
          <AccordionTrigger className="hover:no-underline">
            <span className="text-lg font-semibold">Grind Size Guide</span>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-3">Grind Size Categories</h4>
                <div className="space-y-4">
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Extra Fine</h5>
                    <p className="text-sm mb-2">Powder-like, similar to flour or powdered sugar</p>
                    <p className="text-xs text-neutral-500"><strong>Use for:</strong> Turkish coffee, some espresso methods</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Fine</h5>
                    <p className="text-sm mb-2">Similar to table salt or fine sand</p>
                    <p className="text-xs text-neutral-500"><strong>Use for:</strong> Espresso, AeroPress, Moka Pot</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Medium-Fine</h5>
                    <p className="text-sm mb-2">Between fine and medium, like granulated sugar</p>
                    <p className="text-xs text-neutral-500"><strong>Use for:</strong> V60, Chemex, Kalita Wave, Clever Dripper</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Medium</h5>
                    <p className="text-sm mb-2">Like coarse sand or sea salt</p>
                    <p className="text-xs text-neutral-500"><strong>Use for:</strong> Some pour-over methods, Siphon</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Medium-Coarse</h5>
                    <p className="text-sm mb-2">Like rough sand, visible individual particles</p>
                    <p className="text-xs text-neutral-500"><strong>Use for:</strong> Chemex (larger batches), some immersion methods</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Coarse</h5>
                    <p className="text-sm mb-2">Like breadcrumbs or coarse sea salt</p>
                    <p className="text-xs text-neutral-500"><strong>Use for:</strong> French Press, Cold Brew, large batch Chemex</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Why Grind Size Matters</h4>
                <p className="text-sm mb-2">
                  Grind size directly affects extraction speed and surface area. Finer grinds have more surface area
                  and extract faster, while coarser grinds extract more slowly. Matching grind size to your brew
                  method and time is crucial for balanced extraction.
                </p>
                <p className="text-sm">
                  <strong>Rule of thumb:</strong> Faster brew methods (espresso, AeroPress) need finer grinds.
                  Slower methods (French Press, Cold Brew) need coarser grinds. Pour-over methods typically use
                  medium-fine to medium grinds.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="roasts-beans" className="border border-neutral-200/50 dark:border-neutral-800/50 rounded-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-950/80 shadow-sm px-6">
          <AccordionTrigger className="hover:no-underline">
            <span className="text-lg font-semibold">Roast Levels & Bean Types</span>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-3">Roast Levels</h4>
                <div className="space-y-4">
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Light Roast</h5>
                    <p className="text-sm mb-2">Light brown, no oil on surface, bright and acidic</p>
                    <p className="text-xs text-neutral-500 mb-2"><strong>Best for:</strong> Pour-over methods (V60, Chemex, Kalita Wave), AeroPress</p>
                    <p className="text-xs text-neutral-500"><strong>Why:</strong> Light roasts preserve origin flavors and need higher extraction. Pour-over methods allow precise control over extraction.</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Medium Roast</h5>
                    <p className="text-sm mb-2">Medium brown, balanced flavor, some oil may be visible</p>
                    <p className="text-xs text-neutral-500 mb-2"><strong>Best for:</strong> Most brewing methods - versatile and forgiving</p>
                    <p className="text-xs text-neutral-500"><strong>Why:</strong> Balanced acidity and body work well across all methods. Great for beginners.</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Medium-Dark Roast</h5>
                    <p className="text-sm mb-2">Dark brown, visible oil, richer body, less acidity</p>
                    <p className="text-xs text-neutral-500 mb-2"><strong>Best for:</strong> Espresso, Moka Pot, French Press</p>
                    <p className="text-xs text-neutral-500"><strong>Why:</strong> Richer body and lower acidity complement pressure-based and immersion methods.</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Dark Roast</h5>
                    <p className="text-sm mb-2">Very dark brown to black, oily surface, bold and smoky</p>
                    <p className="text-xs text-neutral-500 mb-2"><strong>Best for:</strong> Espresso, French Press, Cold Brew</p>
                    <p className="text-xs text-neutral-500"><strong>Why:</strong> Bold flavors stand up well to longer extraction times and pressure methods.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-3">Bean Origins & Varieties</h4>
                <div className="space-y-4">
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">African Beans (Ethiopia, Kenya, Rwanda)</h5>
                    <p className="text-sm mb-2">Bright, fruity, floral, wine-like acidity</p>
                    <p className="text-xs text-neutral-500 mb-2"><strong>Best for:</strong> Light to medium roasts, pour-over methods (V60, Chemex)</p>
                    <p className="text-xs text-neutral-500"><strong>Why:</strong> Delicate flavors shine with precise extraction. Pour-over methods highlight complexity.</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Central/South American Beans (Colombia, Guatemala, Brazil)</h5>
                    <p className="text-sm mb-2">Balanced, nutty, chocolatey, mild acidity</p>
                    <p className="text-xs text-neutral-500 mb-2"><strong>Best for:</strong> Medium roasts, all brewing methods</p>
                    <p className="text-xs text-neutral-500"><strong>Why:</strong> Versatile and forgiving. Works well across all methods and roast levels.</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Asian/Pacific Beans (Sumatra, Java, Papua New Guinea)</h5>
                    <p className="text-sm mb-2">Earthy, full-bodied, low acidity, spicy</p>
                    <p className="text-xs text-neutral-500 mb-2"><strong>Best for:</strong> Medium-dark to dark roasts, French Press, Cold Brew, Espresso</p>
                    <p className="text-xs text-neutral-500"><strong>Why:</strong> Bold flavors complement longer extraction and pressure methods.</p>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Specialty Varieties</h5>
                    <p className="text-sm mb-2">Geisha, Bourbon, Typica - unique flavor profiles</p>
                    <p className="text-xs text-neutral-500 mb-2"><strong>Best for:</strong> Light roasts, pour-over methods (V60, Chemex, Kalita Wave)</p>
                    <p className="text-xs text-neutral-500"><strong>Why:</strong> Expensive beans deserve precise extraction to showcase their unique characteristics.</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">General Guidelines</h4>
                <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1 list-disc list-inside">
                  <li>Light roasts: Higher temperature (95-100°C), finer grind, longer extraction</li>
                  <li>Dark roasts: Lower temperature (88-93°C), coarser grind, shorter extraction</li>
                  <li>Single origin beans: Showcase with pour-over methods</li>
                  <li>Blends: More forgiving, work well with all methods</li>
                  <li>Freshness matters: Use beans within 2-4 weeks of roast date</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="troubleshooting" className="border border-neutral-200/50 dark:border-neutral-800/50 rounded-xl bg-white/80 backdrop-blur-sm dark:bg-neutral-950/80 shadow-sm px-6">
          <AccordionTrigger className="hover:no-underline">
            <span className="text-lg font-semibold">Troubleshooting Guide</span>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Coffee tastes sour</h4>
                <p className="text-sm">Under-extracted. Try: finer grind, higher temperature, longer brew time.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Coffee tastes bitter</h4>
                <p className="text-sm">Over-extracted. Try: coarser grind, lower temperature, shorter brew time.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Coffee is weak</h4>
                <p className="text-sm">Low strength. Try: more coffee, less water, or adjust ratio.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Coffee is too strong</h4>
                <p className="text-sm">High strength. Try: less coffee, more water, or adjust ratio.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Uneven extraction</h4>
                <p className="text-sm">Channeling or poor distribution. Try: better pour technique, proper bloom, even coffee bed.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-2">Inconsistent results</h4>
                <p className="text-sm">Lack of consistency. Try: measure everything, use a timer, follow the same technique each time.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

