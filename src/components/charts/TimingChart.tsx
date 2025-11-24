"use client"

import React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { BREWING_METHODS } from "@/lib/brewing-data"
import { getSortedBrewingMethods } from "@/lib/brewing-utils"
import { useFavorites } from "@/hooks/useFavorites"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TimingChart() {
  const { favorites } = useFavorites()
  const sortedMethods = getSortedBrewingMethods(favorites)

  const [selectedMethodId, setSelectedMethodId] = React.useState(BREWING_METHODS[0].id)

  const method = BREWING_METHODS.find(m => m.id === selectedMethodId) || BREWING_METHODS[0]
  // Default to first technique for visualization simplicity
  const technique = method.techniques[0]

  // Generate cumulative data points for the area chart with natural pour curves
  const generateData = () => {
    const dataPoints = [{ time: 0, water: 0, step: "Start" }];
    let currentWater = 0;
    let previousTime = 0;

    technique.steps.forEach((step, index) => {
      if (step.isPour && step.waterAmount) {
        // This is a pour - create gradual slope
        const waterDiff = step.waterAmount - currentWater;
        const timeDiff = step.time - previousTime;

        // For bloom (time 0), make it quick
        if (previousTime === 0) {
          // Quick initial pour over 5 seconds
          dataPoints.push({
            time: Math.min(5, timeDiff / 2),
            water: step.waterAmount,
            step: step.description
          });
        } else {
          // For other pours, create gradual slope over 60-80% of the time period
          const pourDuration = Math.max(10, Math.min(30, timeDiff * 0.7)); // 10-30 seconds pour
          const pourStartTime = previousTime;
          const pourEndTime = previousTime + pourDuration;

          // Add intermediate points for smooth pour
          const numPoints = Math.max(2, Math.floor(pourDuration / 5)); // Points every ~5 seconds
          for (let i = 1; i <= numPoints; i++) {
            const t = pourStartTime + (pourEndTime - pourStartTime) * (i / numPoints);
            const w = currentWater + (step.waterAmount - currentWater) * (i / numPoints);
            dataPoints.push({
              time: t,
              water: Math.round(w),
              step: i === numPoints ? step.description : undefined
            });
          }
        }
        currentWater = step.waterAmount;
      } else if (step.waterAmount) {
        // Pour step without isPour flag - add point directly
        dataPoints.push({
          time: step.time,
          water: step.waterAmount,
          step: step.description
        });
        currentWater = step.waterAmount;
      } else {
        // Non-pour step - maintain water level (flat line)
        dataPoints.push({
          time: step.time,
          water: currentWater,
          step: step.description
        });
      }

      previousTime = step.time;
    });

    // Add final point
    dataPoints.push({
        time: technique.totalTime,
        water: currentWater,
        step: "End"
    });

    return dataPoints.sort((a, b) => a.time - b.time);
  }

  const data = generateData();

  return (
    <div className="space-y-4">
      <div className="w-full overflow-x-auto">
        <Tabs value={selectedMethodId} onValueChange={setSelectedMethodId} className="w-full">
          <TabsList className="inline-flex justify-start overflow-x-auto no-scrollbar min-w-fit">
            {sortedMethods.map((m) => (
              <TabsTrigger key={m.id} value={m.id} className="min-w-[100px] whitespace-nowrap">{m.name}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="w-full">
        <h3 className="text-lg font-semibold mb-4 text-center">Pour Structure - {technique.name}</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" opacity={0.2} />
            <XAxis
                dataKey="time"
                type="number"
                domain={['dataMin', 'dataMax']}
                label={{ value: 'Seconds', position: 'insideBottom', offset: -10, fill: 'currentColor' }}
                tick={{ fill: 'currentColor', fontSize: 12 }}
                tickLine={{ stroke: 'currentColor' }}
                axisLine={{ stroke: 'currentColor' }}
            />
            <YAxis
                label={{ value: 'Water (g)', angle: -90, position: 'insideLeft', offset: 10, fill: 'currentColor' }}
                tick={{ fill: 'currentColor', fontSize: 12 }}
                tickLine={{ stroke: 'currentColor' }}
                axisLine={{ stroke: 'currentColor' }}
            />
            <Tooltip
                content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                    return (
                        <div className="rounded-lg border border-neutral-200/50 bg-white/90 backdrop-blur-sm p-2 shadow-sm dark:bg-neutral-950/90 dark:border-neutral-800/50">
                            <p className="font-bold mb-1">{label}s</p>
                            <p className="text-orange-600 dark:text-orange-400">Water: {payload[0].value}g</p>
                        </div>
                    )
                    }
                    return null
                }}
            />
            <Area
                type="monotone"
                dataKey="water"
                stroke="#f97316"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorWater)"
                animationDuration={500}
            />
          </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

