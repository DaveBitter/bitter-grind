"use client"

import React, { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface TimerProps {
  totalTime: number;
  onTick?: (currentTime: number) => void;
  onComplete?: () => void;
  autoStart?: boolean;
}

export function Timer({ totalTime, onTick, onComplete, autoStart = false }: TimerProps) {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(autoStart)
  const requestRef = useRef<number>(null);
  const startTimeRef = useRef<number>(null);
  const savedTimeRef = useRef<number>(0); // Store time when paused

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    
    const elapsed = (timestamp - startTimeRef.current) / 1000 + savedTimeRef.current;
    
    if (elapsed >= totalTime) {
      setTime(totalTime);
      setIsRunning(false);
      if (onTick) onTick(totalTime);
      if (onComplete) onComplete();
      return; // Stop animation
    }

    setTime(elapsed);
    if (onTick) onTick(elapsed);
    
    if (isRunning) {
       requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = null; // Reset start time reference for new animation frame sequence
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        savedTimeRef.current = time; // Save current time progress
      }
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]); // Intentionally omitting time/totalTime to prevent re-renders from breaking loop logic excessively

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTime(0)
    savedTimeRef.current = 0;
    startTimeRef.current = null;
    if (onTick) onTick(0);
  }

  const progress = Math.min((time / totalTime) * 100, 100)

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="relative flex items-center justify-center">
        <div className="text-6xl font-mono font-bold tabular-nums tracking-wider">
          {formatTime(time)}
        </div>
      </div>
      
      <Progress value={progress} className="h-2 w-full max-w-xs" />
      
      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full transition-all active:scale-95 shadow-sm",
            isRunning 
              ? "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700" 
              : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
          )}
        >
          {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
        </button>
        
        <button
          onClick={resetTimer}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-all hover:bg-neutral-200 active:scale-95 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

