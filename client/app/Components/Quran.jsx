"use client"
import React, { useEffect, useMemo, useRef, useState } from "react"
import axios from "axios"
import { recitersMap } from "@/utils/data"
import PlayerControls from "./Quran/PlayerControls"
import ProgressBar from "./Quran/ProgressBar"
import SurahSelector from "./Quran/SurahSelector"
import SurahInfo from "./Quran/SurahInfo"

export default function QuranPlayer() {
  const [reciters, setReciters] = useState([])
  const [surahs, setSurahs] = useState([])
  const [selectedReciterId, setSelectedReciterId] = useState("")
  const [surahId, setSurahId] = useState(1)
  const [ayahs, setAyahs] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const reciter = useMemo(
    () => reciters.find(r => String(r.id) === selectedReciterId) || null,
    [reciters, selectedReciterId]
  )

  // 🟢 جلب الشيوخ (معلق حالياً)
  // useEffect(() => {
  //   const fetchReciters = async () => {
  //     try {
  //       const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/quran/reciters`);
  //       setReciters(data || []);
  //       if (data?.recitations?.length) {
  //         setSelectedReciterId(String(data.recitations[0].id));
  //       }
  //     } catch (err) {
  //       console.error("❌ خطأ في جلب الشيوخ:", err);
  //     }
  //   };
  //   fetchReciters();
  // }, []);

  // 🟢 جلب السور
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/quran/surahs`)
        setSurahs(data?.surahs || [])
        if (data?.surahs?.length) {
          setSurahId(Number(data.surahs[0].id))
        }
      } catch (err) {
        console.error("❌ خطأ في جلب السور:", err)
      }
    }
    fetchSurahs()
  }, [])

  // 🟢 جلب التلاوة
  useEffect(() => {
    if (!surahId) return
    const fetchAyahs = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/quran/surah/${surahId}/8`
        )
        console.log("🔊 رابط التلاوة:", data?.audioUrl)
        const url = data?.audioUrl ? [data.audioUrl] : []
        setAyahs(url)
        setIsPlaying(false)
        setProgress(0)
        setDuration(0)
      } catch (err) {
        console.error("❌ خطأ في جلب التلاوة:", err)
      }
    }
    fetchAyahs()
  }, [surahId])

  // 🟢 تحديث الصوت عند تغيير السورة
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !ayahs.length) return

    audio.src = ayahs[0]
    setProgress(0)
    setDuration(0)

    // تشغيل تلقائي عند تحميل سورة جديدة
    const p = audio.play()
    if (p && typeof p.then === "function") {
      p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }, [ayahs])

  // 🟢 متابعة شريط التقدم
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const updateProgress = () => setProgress(audio.currentTime || 0)
    const handleLoaded = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
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
      const p = audio.play()
      if (p && typeof p.then === "function") {
        p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
      } else {
        setIsPlaying(true)
      }
    }
  }

  const nextSurah = () => {
    const idx = surahs.findIndex(s => Number(s.id) === Number(surahId))
    if (idx < surahs.length - 1) setSurahId(Number(surahs[idx + 1].id))
  }

  const prevSurah = () => {
    const idx = surahs.findIndex(s => Number(s.id) === Number(surahId))
    if (idx > 0) setSurahId(Number(surahs[idx - 1].id))
  }

  const formatTime = (sec) => {
    if (!Number.isFinite(sec) || sec <= 0) return "0:00"
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#0d1117]/80 backdrop-blur-lg p-8">
      <audio ref={audioRef} className="hidden" />

      <h2 className="text-3xl font-bold text-center text-white mb-6">
        📖 مشغل القرآن الكريم
      </h2>

      <SurahSelector surahs={surahs} surahId={surahId} setSurahId={setSurahId} />

      <PlayerControls
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        nextSurah={nextSurah}
        prevSurah={prevSurah}
        surahId={surahId}
        surahs={surahs}
      />

      <ProgressBar
        progress={progress}
        duration={duration}
        setProgress={setProgress}
        audioRef={audioRef}
        formatTime={formatTime}
      />

      <SurahInfo surahs={surahs} surahId={surahId} ayahs={ayahs} />
    </div>
  )
}
