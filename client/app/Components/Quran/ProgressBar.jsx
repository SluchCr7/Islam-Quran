"use client"
import React from "react"

export default function ProgressBar({ progress, duration, setProgress, audioRef, formatTime }) {
  const handleSeek = (e) => {
    const newTime = Number(e.target.value)
    setProgress(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  return (
    <div className="w-full">
      <input
        type="range"
        min="0"
        max={duration > 0 ? duration : 0}
        value={progress}
        step="0.1"
        onChange={handleSeek}
        className="w-full h-1.5 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600 mb-3
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-gold-accent
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-white
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-gold-accent
          [&::-moz-range-thumb]:border-2
          [&::-moz-range-thumb]:border-white
          [&::-moz-range-thumb]:cursor-pointer"
        style={{
          background: `linear-gradient(to left, var(--primary) ${(progress / (duration || 1)) * 100}%, #f1f5f9 ${(progress / (duration || 1)) * 100}%)`,
        }}
      />

      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

