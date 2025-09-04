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
    <div className="w-full mt-6">
      {/* شريط التقدم */}
      <input
        type="range"
        min="0"
        max={duration > 0 ? duration : 0}
        value={progress}
        step="0.1"
        onChange={handleSeek}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-green-500
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-green-500
          [&::-moz-range-thumb]:cursor-pointer"
        style={{
          background: `linear-gradient(to left, #22c55e ${(progress / (duration || 1)) * 100}%, #374151 ${(progress / (duration || 1)) * 100}%)`,
        }}
      />

      {/* الوقت */}
      <div className="flex justify-between text-sm text-gray-300 mt-2">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}
