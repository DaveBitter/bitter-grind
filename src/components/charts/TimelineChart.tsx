"use client"

import React from "react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { BrewingTechnique } from "@/lib/brewing-data"

interface TimelineChartProps {
  technique: BrewingTechnique;
  totalWater: number;
}

export function TimelineChart({ technique, totalWater }: TimelineChartProps) {
  // Calculate scale factor if the user adjusted the ratio/coffee amount
  const defaultTotalWater = technique.defaultCoffeeAmount * technique.ratio;
  const scaleFactor = totalWater / defaultTotalWater;

  // Generate data points for the area chart (cumulative water over time)
  const generateData = () => {
    const dataPoints = [{ time: 0, water: 0, description: "Start" }];
    let currentWater = 0;
    let previousTime = 0;

    technique.steps.forEach((step, index) => {
      const scaledWater = step.waterAmount ? Math.round(step.waterAmount * scaleFactor) : currentWater;

      if (step.isPour && step.waterAmount) {
        // This is a pour - create gradual slope
        const waterDiff = scaledWater - currentWater;
        const timeDiff = step.time - previousTime;

        // For bloom (time 0), make it quick
        if (previousTime === 0) {
          // Quick initial pour over 5 seconds
          dataPoints.push({
            time: Math.min(5, timeDiff / 2),
            water: scaledWater,
            description: step.description
          });
        } else {
          // For other pours, create gradual slope over 60-80% of the time period
          // This makes it look like a natural pour
          const pourDuration = Math.max(10, Math.min(30, timeDiff * 0.7)); // 10-30 seconds pour
          const pourStartTime = previousTime;
          const pourEndTime = previousTime + pourDuration;

          // Add intermediate points for smooth pour
          const numPoints = Math.max(2, Math.floor(pourDuration / 5)); // Points every ~5 seconds
          for (let i = 1; i <= numPoints; i++) {
            const t = pourStartTime + (pourEndTime - pourStartTime) * (i / numPoints);
            const w = currentWater + (scaledWater - currentWater) * (i / numPoints);
            dataPoints.push({
              time: t,
              water: Math.round(w),
              description: i === numPoints ? step.description : ""
            });
          }
        }
        currentWater = scaledWater;
      } else {
        // Non-pour step - maintain water level (flat line)
        dataPoints.push({
          time: step.time,
          water: currentWater,
          description: step.description
        });
      }

      previousTime = step.time;
    });

    // Add final point at total time
    dataPoints.push({
        time: technique.totalTime,
        water: currentWater,
        description: "End"
    });

    return dataPoints.sort((a, b) => a.time - b.time);
  }

  const data = generateData();
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  return (
    <div className="w-full">
       <h4 className="text-sm font-medium text-neutral-500 mb-6 uppercase tracking-wider text-center">Pour Structure</h4>
       <div className="h-[250px] w-full">
         <ResponsiveContainer width="100%" height="100%">
           <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
           >
             <defs>
               <linearGradient id="timelineGradient" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                 <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
               </linearGradient>
             </defs>
             <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" opacity={0.3} vertical={false} />
             <XAxis
               dataKey="time"
               type="number"
               domain={[0, technique.totalTime]}
               tickFormatter={(val) => `${Math.floor(val/60)}:${(val%60).toString().padStart(2,'0')}`}
               stroke="#888888"
               fontSize={12}
               tickLine={false}
               axisLine={{ stroke: '#e5e5e5' }}
               minTickGap={30}
             />
             <YAxis
               orientation="right"
               tickFormatter={(val) => `${val}g`}
               stroke="#888888"
               fontSize={12}
               tickLine={false}
               axisLine={false}
               width={40}
             />
             <Tooltip
               cursor={{ stroke: '#f97316', strokeWidth: 1 }}
               content={({ active, payload }) => {
                 if (active && payload && payload.length) {
                   const data = payload[0].payload;
                   return (
                     <div className="rounded-lg border border-neutral-200/50 bg-white/90 backdrop-blur-sm p-2 shadow-sm dark:bg-neutral-950/90 dark:border-neutral-800/50 text-xs">
                       <p className="font-bold mb-1">{formatTime(data.time)}</p>
                       <p className="text-orange-600 dark:text-orange-400 font-medium">{data.water}g Water</p>
                       {data.description && <p className="text-neutral-500 mt-1 max-w-[150px]">{data.description}</p>}
                     </div>
                   );
                 }
                 return null;
               }}
             />
             <Area
               type="monotone"
               dataKey="water"
               stroke="#f97316"
               strokeWidth={2}
               fill="url(#timelineGradient)"
               animationDuration={500}
             />
           </AreaChart>
         </ResponsiveContainer>
       </div>
    </div>
  )
}

