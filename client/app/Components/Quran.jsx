"use client"
import React, { useState, useRef, useEffect } from "react"
import { menshQuran } from "@/utils/data"
import PlayerHeader from "./Quran/PlayerHeader"
import SurahSelector from "./Quran/SurahSelector"
import SurahInfo from "./Quran/SurahInfo"
import PlayerControls from "./Quran/PlayerControls"
import ProgressBar from "./Quran/ProgressBar"

export default function QuranPlayer() {
  const [surahId, setSurahId] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const currentSurah = menshQuran.find((s) => s.id === surahId)
    if (!currentSurah) return
    audio.src = currentSurah.url
    audio.load()
    setIsPlaying(false)
    setProgress(0)
    setDuration(0)
  }, [surahId])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const updateProgress = () => setProgress(audio.currentTime || 0)
    const handleLoaded = () =>
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", handleLoaded)
    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", handleLoaded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }

  const nextSurah = () => surahId < menshQuran.length && setSurahId(surahId + 1)
  const prevSurah = () => surahId > 1 && setSurahId(surahId - 1)

  const formatTime = (sec) => {
    if (!Number.isFinite(sec) || sec <= 0) return "0:00"
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  return (
    <div className="h-full flex items-center justify-center bg-white rounded-[2.5rem] border border-emerald-50 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/patterns/subtle-pattern.png')] opacity-20 pointer-events-none" />

      <audio ref={audioRef} className="hidden" />

      <div className="w-full relative z-10 p-8 space-y-6">
        <PlayerHeader />

        <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100/50 shadow-inner">
          <SurahSelector surahId={surahId} setSurahId={setSurahId} surahs={menshQuran} />
        </div>

        <PlayerControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          nextSurah={nextSurah}
          prevSurah={prevSurah}
          surahId={surahId}
          surahs={menshQuran}
        />

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-emerald-50 shadow-sm">
          <ProgressBar
            progress={progress}
            duration={duration}
            setProgress={setProgress}
            audioRef={audioRef}
            formatTime={formatTime}
          />
        </div>
      </div>
    </div>
  )
}

