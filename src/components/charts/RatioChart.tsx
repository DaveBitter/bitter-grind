"use client"

import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from "recharts"
import { BREWING_METHODS } from "@/lib/brewing-data"

export function RatioChart() {
  const data = BREWING_METHODS.flatMap(method =>
    method.techniques.map(tech => ({
      name: tech.name.split(' ').slice(0, 2).join(' '), // Shorten name
      ratio: tech.ratio,
      method: method.name,
      fullTechName: tech.name
    }))
  )

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-center">Brew Ratio Comparison (1:x)</h3>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e5e5" opacity={0.2} />
          <XAxis type="number" domain={[0, 22]} hide />
          <YAxis
            type="category"
            dataKey="name"
            width={150}
            tick={{ fontSize: 11, fill: 'currentColor' }}
            interval={0}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="rounded-lg border border-neutral-200/50 bg-white/90 backdrop-blur-sm p-2 shadow-sm dark:bg-neutral-950/90 dark:border-neutral-800/50">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-neutral-500">
                          Technique
                        </span>
                        <span className="font-bold text-neutral-900 dark:text-neutral-50">
                          {data.fullTechName}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-neutral-500">
                          Ratio
                        </span>
                        <span className="font-bold text-neutral-900 dark:text-neutral-50">
                          1:{data.ratio}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="ratio" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.ratio < 5 ? "#f97316" : "#f97316"} />
            ))}
            <LabelList dataKey="ratio" position="right" formatter={(val: any) => `1:${val}`} fill="#9ca3af" fontSize={12} />
          </Bar>
        </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

