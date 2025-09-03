'use client'
import React, { useEffect, useMemo, useRef, useState } from "react"
import axios from "axios"
import { Play, Pause, StepBack, StepForward } from "lucide-react"

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

  // خريطة تحويل الأسماء
  const recitersMap = {
    "AbdulBaset AbdulSamad": "عبدالباسط عبدالصمد",
    "Abdur-Rahman as-Sudais": "عبدالرحمن السديس",
    "Abu Bakr al-Shatri": "أبو بكر الشاطري",
    "Hani ar-Rifai": "هاني الرفاعي",
    "Mahmoud Khalil Al-Husary": "محمود خليل الحصري",
    "Mishari Rashid al-`Afasy": "مشاري بن راشد العفاسي",
    "Mohamed Siddiq al-Minshawi": "محمد صديق المنشاوي",
    "Sa`ud ash-Shuraym": "سعود الشريم",
    "Mohamed al-Tablawi": "محمد محمود الطبلاوي"
  };

  const reciter = useMemo(
    () => reciters.find(r => String(r.id) === selectedReciterId) || null,
    [reciters, selectedReciterId]
  )
  // 🟢 جلب الشيوخ
  useEffect(() => {
    const fetchReciters = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/quran/reciters`);
        console.log("📡 Reciters response:", data); // Debug

        const list = data?.recitations || [];
        setReciters(list);

        if (list.length) setSelectedReciterId(String(list[0].id));
      } catch (err) {
        console.error("❌ خطأ في جلب الشيوخ:", err);
      }
    };
    fetchReciters();
  }, []);


  // 🟢 جلب السور
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/quran/surahs`)
        setSurahs(data || [])
        if (data?.length) setSurahId(Number(data[0].id))
      } catch (err) {
        console.error("❌ خطأ في جلب السور:", err)
      }
    }
    fetchSurahs()
  }, [])

  // 🟢 جلب التلاوة
  useEffect(() => {
    if (!reciter || !surahId) return
    const fetchAyahs = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/quran/surah/${surahId}/${reciter.id}`
        )
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
  }, [reciter, surahId])

  // 🟢 تحديث الصوت
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !ayahs.length) return
    audio.src = ayahs[0]
    setProgress(0)
    setDuration(0)
    if (isPlaying) {
      const p = audio.play()
      if (p && typeof p.catch === "function") p.catch(() => {})
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
    <div className="w-full relative rounded-3xl  overflow-hidden shadow-2xl">
      <div 
        className="absolute inset-0 bg-[url('/bgs/quran4.jpg')] bg-cover bg-center opacity-30 pointer-events-none" 
      />
      <div className="relative z-10 p-6 min-h-[350px] bg-[#0d1117]/70 backdrop-blur-md rounded-3xl text-white">
        <h2 className="text-2xl font-bold text-center mb-6">🎶 مشغل القرآن الكريم</h2>

        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* ✅ اختيارات */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <label className="block mb-1 text-gray-300">اختر الشيخ:</label>
              <select
                value={selectedReciterId}
                onChange={(e) => setSelectedReciterId(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-900/70 border border-gray-700 focus:ring-2 focus:ring-green-500"
              >
                {reciters.map((r) => (
                  <option key={String(r.id)} value={String(r.id)}>
                    {recitersMap[r.reciter_name] || r.reciter_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <label className="block mb-1 text-gray-300">اختر السورة:</label>
              <select
                value={String(surahId)}
                onChange={(e) => setSurahId(Number(e.target.value))}
                className="w-full p-2 rounded-lg bg-gray-900/70 border border-gray-700 focus:ring-2 focus:ring-green-500"
              >
                {surahs.map((s) => (
                  <option key={String(s.id)} value={String(s.id)}>
                    {s.name_ar}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ✅ المشغل */}
          <div className="w-full md:w-2/3 flex flex-col items-center">
            <audio ref={audioRef} className="hidden" />

            {/* أزرار التحكم */}
            <div className="flex items-center gap-6 mt-4">
              <button
                onClick={prevSurah}
                disabled={surahId === Number(surahs[0]?.id)}
                className="p-3 bg-gray-700/80 rounded-full hover:bg-gray-600 transition disabled:opacity-40"
              >
                <StepBack size={24} />
              </button>

              <button
                onClick={togglePlay}
                className="p-6 bg-green-500 rounded-full hover:bg-green-600 shadow-lg transition transform active:scale-95"
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </button>

              <button
                onClick={nextSurah}
                disabled={surahId === Number(surahs[surahs.length - 1]?.id)}
                className="p-3 bg-gray-700/80 rounded-full hover:bg-gray-600 transition disabled:opacity-40"
              >
                <StepForward size={24} />
              </button>
            </div>

            {/* شريط التقدم */}
            <div className="w-full mt-6">
              <input
                type="range"
                value={progress}
                max={duration || 0}
                step="0.1"
                onChange={(e) => {
                  const val = Number(e.target.value)
                  if (audioRef.current) audioRef.current.currentTime = val
                  setProgress(val)
                }}
                className="w-full accent-green-500"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* معلومات السورة */}
            <div className="mt-6 text-sm text-gray-200">
              {ayahs.length
                ? ` سورة ${surahs.find((s) => Number(s.id) === Number(surahId))?.name_ar || "سورة"} `
                : "جاري تحميل التلاوة..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
