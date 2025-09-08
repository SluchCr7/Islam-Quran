
// 'use client'
// import React, { useEffect, useMemo, useState } from 'react'
// import { motion } from 'framer-motion'
// import { BookOpen, BellRing } from 'lucide-react'
// import { usePrayer } from './Context/PrayerContext'
// import { SiteHeader } from './Components/SiteHeader'
// import { NextPrayerCard } from './Components/NextPryrer'
// import { InfoCard } from './Components/InfoCard'
// import { PrayerCardsGrid } from './Components/Timings'
// import QiblaCompass from './Components/Compass'
// import QuranPlayer from './Components/Quran'
// import CalenderHijri from './Components/Calender'
// import Hadith from './Components/Hadith'
// import Link from 'next/link'
// import { PRAYER_BG, PRAYER_META } from '@/utils/data'
// import WeatherWidgetPremium from './Components/Wether'
// import Counter from './Components/Counter'
// import SeerahWidgetPro from './Components/SeerhaWedgit'
// import { cn } from "@/lib/utils"
// // import AsmaulHusnaMarquee from './Components/AsmaaAllah'

// export default function IslamicDashboard() {
//   const { prayers, info } = usePrayer()
//   const [offset, setOffset] = useState(0)
//   const [enabled, setEnabled] = useState(false)

//   // تحديث offset عند التمرير
//   useEffect(() => {
//     const handleScroll = () => setOffset(window.scrollY * 0.1)
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//     // استرجاع حالة التفعيل
//   useEffect(() => {
//     const saved = localStorage.getItem("adhan-enabled")
//     console.log("⏺ Saved setting:", saved)
//     if (saved === "true") setEnabled(true)
//   }, [])

//   const todayList = useMemo(() => {
//     if (!prayers) return []
//     const now = new Date()
//     const parse = (t) => (t ? new Date(`${now.toDateString()} ${t}`) : null)
//     return [
//       { key: 'Fajr', label: PRAYER_META.Fajr.ar, time: parse(prayers.Fajr) },
//       { key: 'Dhuhr', label: PRAYER_META.Dhuhr.ar, time: parse(prayers.Dhuhr) },
//       { key: 'Asr', label: PRAYER_META.Asr.ar, time: parse(prayers.Asr) },
//       { key: 'Maghrib', label: PRAYER_META.Maghrib.ar, time: parse(prayers.Maghrib) },
//       { key: 'Isha', label: PRAYER_META.Isha.ar, time: parse(prayers.Isha) },
//     ].filter((p) => p.time instanceof Date && !isNaN(p.time.getTime()))
//   }, [prayers])

//   const { next, prev } = useMemo(() => {
//     const now = new Date()
//     const upcoming = todayList.find((p) => p.time > now)
//     const previous = [...todayList].reverse().find((p) => p.time <= now)

//     if (!todayList.length) return { next: null, prev: null }

//     if (!upcoming) {
//       const fajr = todayList[0]
//       const tmr = new Date(fajr.time)
//       tmr.setDate(tmr.getDate() + 1)
//       return { next: { ...fajr, time: tmr }, prev: todayList[todayList.length - 1] }
//     }
//     return { next: upcoming, prev: previous ?? todayList[todayList.length - 1] }
//   }, [todayList])

//   // تشغيل الأذان عند دخول الوقت
//   useEffect(() => {
//     if (!enabled || !next) return
//     const checkPrayer = setInterval(() => {
//       const now = new Date()
//       const prayerTime = new Date(next.time)
//       if (Math.abs(prayerTime.getTime() - now.getTime()) < 1000 * 30) {
//         if (Notification.permission === "granted") {
//           new Notification("🕌 وقت الصلاة", {
//             body: `حان الآن موعد ${next.label}`,
//             icon: "/mosque.png",
//           })
//         }
//         const adhan = new Audio(`/adhan/${next.key}.mp3`)
//         adhan.play()
//       }
//     }, 30 * 1000)
//     return () => clearInterval(checkPrayer)
//   }, [enabled, next])

//   // تفعيل الأذان
//   const handleEnable = async () => {
//     try {
//       if (Notification.permission !== "granted") {
//         await Notification.requestPermission()
//       }
//       const audio = new Audio("/adahn2.mp3")
//       await audio.play().catch(() => {
//         console.warn("Autoplay blocked temporarily, but we'll enable anyway.")
//       })
//       setEnabled(true)
//       localStorage.setItem("adhan-enabled", "true")
//     } catch (err) {
//       console.error("خطأ في التفعيل:", err)
//     }
//   }

//   const books = [
//     { name: "صحيح البخاري", slug: "bukhary", color: "from-yellow-500 to-amber-600", badge: "حديث" },
//     { name: "صحيح مسلم", slug: "muslim", color: "from-blue-500 to-indigo-600", badge: "حديث" },
//     { name: "سنن الترمذي", slug: "tirmidhi", color: "from-green-500 to-emerald-600", badge: "حديث" },
//     { name: "حصن المسلم", slug: "hisn", color: "from-purple-500 to-pink-600", badge: "أذكار" },
//   ]

//   // if (!info || !info.date) {
//   //   return (
//   //     <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-white">
//   //       <motion.div
//   //         initial={{ opacity: 0, scale: 0.8 }}
//   //         animate={{ opacity: 1, scale: 1 }}
//   //         transition={{ duration: 0.6 }}
//   //         className="text-center space-y-6"
//   //       >
//   //         <h1 className="text-3xl font-bold text-yellow-400">مرحباً بك 👋</h1>
//   //         <p className="text-lg text-gray-300">جاري تحميل بيانات اليوم الهجري والمواقيت...</p>
//   //         <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent mx-auto"></div>
//   //       </motion.div>
//   //     </div>
//   //   )
//   // }

//   return (
//     <div dir="rtl" className="relative min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#e6edf3] font-sans overflow-x-hidden">
      
//       {/* خلفية ديناميكية محسّنة */}
//       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
//         {/* شبكة نقطية */}
//         <div
//           className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] 
//                      bg-[size:36px_36px] opacity-20"
//           style={{ transform: `translateY(${offset * 0.3}px)` }}
//         />
//         {/* شبكة خطوط ناعمة */}
//         <div
//           className="absolute inset-0 
//                      [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),
//                      linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] 
//                      [background-size:60px_60px] opacity-10"
//           style={{ transform: `translateY(${offset * 0.6}px)` }}
//         />
//         {/* زخرفة إسلامية خفيفة */}
//         <div
//           className="absolute inset-0 opacity-5 bg-[url('/patterns/islamic-pattern.svg')] bg-repeat"
//           style={{ backgroundSize: "120px 120px" }}
//         />
//       </div>

//       <SiteHeader />

//       <main className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 relative z-10">
//         {/* Prayer & Info */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} 
//             className="rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg p-4">
//             <NextPrayerCard next={next} prev={prev} />
//           </motion.div>
//           <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
//             className="rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg p-4">
//             <InfoCard info={info} />
//           </motion.div>
//         </div>

//         {/* زر تفعيل الأذان */}
//         {!enabled && (
//           <div className="flex justify-center mb-6">
//             <button
//               onClick={handleEnable}
//               className="flex items-center gap-2 px-6 py-3 rounded-xl 
//                        bg-gradient-to-r from-green-700 to-green-600 
//                        text-white font-bold shadow-lg hover:scale-105 
//                        transition-all"
//             >
//               <BellRing className="w-5 h-5 text-yellow-300" />
//               تفعيل تشغيل الأذان التلقائي
//             </button>
//           </div>
//         )}

//         {/* Prayer Grid */}
//         <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
//           className="rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg p-4">
//           <PrayerCardsGrid todayList={todayList} nextKey={next?.key} PRAYER_META={PRAYER_META} PRAYER_BG={PRAYER_BG} />
//         </motion.div>

//         {/* Quran & Compass */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-h-[400px] items-stretch">
//           <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
//             className="lg:col-span-2 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden">
//             <QuranPlayer className="w-full h-full" />
//           </motion.div>
//           <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
//             className="lg:col-span-1 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden">
//             <QiblaCompass className="w-full h-full" />
//           </motion.div>
//         </div>

//         {/* Hijri Calendar */}
//         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
//           className="w-full rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden">
//           <CalenderHijri />
//         </motion.div>

//         {/* Hadith & Quran Button */}
//         <div className="relative w-full">
//           <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
//             className="flex flex-col lg:flex-row gap-6 items-stretch">
//             <div className="lg:flex-1 rounded-2xl">
//               <Hadith />
//             </div>
//             <motion.div whileHover={{ scale: 1.05, rotate: 1 }} whileTap={{ scale: 0.97 }}
//               className="lg:w-72 flex flex-col justify-center items-center rounded-2xl shadow-xl relative overflow-hidden font-bold text-lg">
//               <div className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
//                 style={{ backgroundImage: "url('/quranKarem.jpg')" }} />
//               <div className="absolute inset-0 bg-black/60" />
//               <Link href="/Pages/Quran" className="relative z-10 flex flex-col items-center gap-3 py-8">
//                 <div className="relative flex items-center justify-center">
//                   <div className="absolute inset-0 w-20 h-20 rounded-full bg-yellow-400/20 blur-xl"></div>
//                   <BookOpen className="w-12 h-12 z-10 text-yellow-400 drop-shadow-lg" />
//                 </div>
//                 <span className="z-10 text-xl text-yellow-400 drop-shadow-lg tracking-wide">المصحف الشريف</span>
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Books Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {books.map((book) => {
//             const href = book.slug === "hisn" ? `/Pages/Hisn` : `/Pages/Hadith/${book.slug}`
//             return (
//               <Link key={book.slug} href={href}>
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
//                   className={`relative rounded-2xl shadow-2xl p-6 h-44 flex flex-col justify-center items-center 
//                               overflow-hidden bg-gradient-to-br ${book.color} text-white cursor-pointer`}>
//                   <div className="absolute inset-0 opacity-15 bg-[url('/patterns/islamic-pattern.svg')] bg-cover" />
//                   <div className="absolute top-3 right-3 px-3 py-1 text-xs rounded-full bg-black/40 backdrop-blur-md">
//                     {book.badge}
//                   </div>
//                   <motion.div whileHover={{ rotate: 10 }} className="relative flex items-center justify-center mb-3">
//                     <div className="absolute inset-0 w-16 h-16 rounded-full bg-white/20 blur-xl"></div>
//                   </motion.div>
//                   <span className="relative z-10 font-bold text-lg tracking-wide drop-shadow-lg">
//                     {book.name}
//                   </span>
//                 </motion.div>
//               </Link>
//             )
//           })}
//         </div>

//         {/* الطقس + أسماء الله + السيرة */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
//             className="lg:col-span-1 w-full min-h-[250px] ">
//             <WeatherWidgetPremium className="w-full h-full" />
//           </motion.div>
//           <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
//             className="lg:col-span-2 w-full min-h-[250px] rounded-2xl ">
//             <Counter className="w-full h-full" />
//           </motion.div>
//           <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
//             className="lg:col-span-1 w-full min-h-[250px] rounded-2xl">
//             <SeerahWidgetPro />
//           </motion.div>
//         </div>
//       </main>

//       {/* <AsmaulHusnaMarquee /> */}
//       <SiteFooter />
//     </div>
//   )
// }

// function SiteFooter() {
//   return (
//     <footer className="border-t border-[#30363d]/60">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-[#8b949e]">
//         <p>﴿إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا﴾</p>
//       </div>
//     </footer>
//   )
// }



'use client'
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, BellRing } from 'lucide-react'
import { usePrayer } from './Context/PrayerContext'
import { SiteHeader } from './Components/SiteHeader'
import { NextPrayerCard } from './Components/NextPryrer'
import { InfoCard } from './Components/InfoCard'
import { PrayerCardsGrid } from './Components/Timings'
import QiblaCompass from './Components/Compass'
import QuranPlayer from './Components/Quran'
import CalenderHijri from './Components/Calender'
import Hadith from './Components/Hadith'
import Link from 'next/link'
import { PRAYER_BG, PRAYER_META } from '@/utils/data'
import WeatherWidgetPremium from './Components/Wether'
import Counter from './Components/Counter'
import SeerahWidgetPro from './Components/SeerhaWedgit'

// ========== Utils ==========
const canUseDOM = () => typeof window !== 'undefined'

// صيغة parsing بسيطة لتوقيت اليوم الحالي
const parseTodayTime = (timeStr) => {
  if (!timeStr) return null
  const now = new Date()
  // اعتمادًا على تنسيق أوقاتك (مثلاً "04:15" أو "04:15 AM")
  return new Date(`${now.toDateString()} ${timeStr}`)
}

// يبني قائمة اليوم + يُرجع القادم/السابق
function buildTodaySchedule(prayers) {
  if (!prayers) return { list: [], next: null, prev: null }
  const now = new Date()
  const list = [
    { key: 'Fajr', label: PRAYER_META.Fajr?.ar ?? 'الفجر', time: parseTodayTime(prayers.Fajr) },
    { key: 'Dhuhr', label: PRAYER_META.Dhuhr?.ar ?? 'الظهر', time: parseTodayTime(prayers.Dhuhr) },
    { key: 'Asr', label: PRAYER_META.Asr?.ar ?? 'العصر', time: parseTodayTime(prayers.Asr) },
    { key: 'Maghrib', label: PRAYER_META.Maghrib?.ar ?? 'المغرب', time: parseTodayTime(prayers.Maghrib) },
    { key: 'Isha', label: PRAYER_META.Isha?.ar ?? 'العشاء', time: parseTodayTime(prayers.Isha) },
  ].filter(p => p.time instanceof Date && !isNaN(p.time.getTime()))

  const upcoming = list.find(p => p.time > now)
  const previous = [...list].reverse().find(p => p.time <= now)

  if (!list.length) return { list, next: null, prev: null }

  if (!upcoming) {
    const fajr = list[0]
    const tmr = new Date(fajr.time)
    tmr.setDate(tmr.getDate() + 1)
    return { list, next: { ...fajr, time: tmr }, prev: list[list.length - 1] }
  }
  return { list, next: upcoming, prev: previous ?? list[list.length - 1] }
}

// ========== Main ==========
export default function IslamicDashboard() {
  const { prayers, info } = usePrayer()

  // خلفية ديناميكية (RAF لتحسين الأداء)
  const [offset, setOffset] = useState(0)
  const tickingRef = useRef(false)
  useEffect(() => {
    if (!canUseDOM()) return
    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true
        requestAnimationFrame(() => {
          setOffset(window.scrollY * 0.1)
          tickingRef.current = false
        })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // حالة تفعيل الأذان
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    if (!canUseDOM()) return
    const saved = window.localStorage.getItem('adhan-enabled')
    if (saved === 'true') setEnabled(true)
  }, [])

  // بناء الجدول اليومي + اختيار القادم/السابق
  const { list: todayList, next, prev } = useMemo(() => buildTodaySchedule(prayers), [prayers])

  // جدولة الأذان (تشغيل مرة واحدة في وقت الصلاة)
  const adhanTimerRef = useRef(null)
  const audioRef = useRef(canUseDOM() ? new Audio() : null)

  useEffect(() => {
    // تنظيف أي مؤقت سابق
    if (adhanTimerRef.current) {
      clearTimeout(adhanTimerRef.current)
      adhanTimerRef.current = null
    }
    if (!enabled || !next) return

    const now = new Date()
    const target = new Date(next.time)
    const diff = target.getTime() - now.getTime()
    if (diff <= 0) return

    adhanTimerRef.current = setTimeout(async () => {
      try {
        if (canUseDOM() && 'Notification' in window) {
          if (Notification.permission === 'granted') {
            new Notification('🕌 وقت الصلاة', {
              body: `حان الآن موعد ${next.label}`,
              icon: '/mosque.png',
            })
          }
        }
        if (audioRef.current) {
          audioRef.current.src = `/adhan/${next.key}.mp3`
          await audioRef.current.play().catch(() => {
            // فشل التشغيل (مثلاً: حظر تشغيل تلقائي)
          })
        }
      } finally {
        // لا شيء
      }
    }, diff)

    return () => {
      if (adhanTimerRef.current) clearTimeout(adhanTimerRef.current)
    }
  }, [enabled, next])

  const handleEnable = useCallback(async () => {
    try {
      if (canUseDOM() && 'Notification' in window && Notification.permission !== 'granted') {
        await Notification.requestPermission()
      }
      // محاولة تشغيل صوت قصير (قد يُحظر على بعض المتصفحات بدون تفاعل)
      const test = new Audio('/adahn2.mp3')
      await test.play().catch(() => {
        // لو اتمنع التشغيل التلقائي، مفيش مشكلة
      })
      setEnabled(true)
      if (canUseDOM()) window.localStorage.setItem('adhan-enabled', 'true')
    } catch (err) {
      // صامت
    }
  }, [])

  // شاشة تحميل آمنة
  if (!info || !info.date || !prayers) {
    return (
      <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="text-center space-y-6"
        >
          <h1 className="text-3xl font-bold text-yellow-400">مرحباً بك 👋</h1>
          <p className="text-lg text-gray-300">جاري تحميل بيانات اليوم الهجري والمواقيت...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent mx-auto"></div>
        </motion.div>
      </div>
    )
  }

  return (
    <div dir="rtl" className="relative min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#e6edf3] font-sans overflow-x-hidden">
      {/* خلفية ديناميكية محسّنة */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* شبكة نقطية */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:36px_36px] opacity-20 will-change-transform"
          style={{ transform: `translateY(${offset * 0.3}px)` }}
        />
        {/* شبكة خطوط ناعمة */}
        <div
          className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:60px_60px] opacity-10 will-change-transform"
          style={{ transform: `translateY(${offset * 0.6}px)` }}
        />
        {/* زخرفة إسلامية خفيفة */}
        <div
          className="absolute inset-0 opacity-5 bg-[url('/patterns/islamic-pattern.svg')] bg-repeat"
          style={{ backgroundSize: '120px 120px' }}
        />
      </div>

      <SiteHeader />

      <main className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 relative z-10">
        {/* Prayer & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
            className="rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg p-4">
            <NextPrayerCard next={next} prev={prev} />
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.45}}
            className="rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg p-4">
            <InfoCard info={info} />
          </motion.div>
        </div>

        {/* زر تفعيل الأذان */}
        {!enabled && (
          <div className="flex justify-center mb-6">
            <button
              onClick={handleEnable}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-700 to-green-600 text-white font-bold shadow-lg hover:scale-105 transition-all"
            >
              <BellRing className="w-5 h-5 text-yellow-300" />
              تفعيل تشغيل الأذان التلقائي
            </button>
          </div>
        )}

        {/* Prayer Grid */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
          className="rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg p-4">
          <PrayerCardsGrid todayList={todayList} nextKey={next?.key} PRAYER_META={PRAYER_META} PRAYER_BG={PRAYER_BG} />
        </motion.div>

        {/* Quran & Compass */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-h-[400px] items-stretch">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.45}}
            className="lg:col-span-2 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden">
            <QuranPlayer className="w-full h-full" />
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
            className="lg:col-span-1 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden">
            <QiblaCompass className="w-full h-full" />
          </motion.div>
        </div>

        {/* Hijri Calendar */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="w-full rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden">
          <CalenderHijri />
        </motion.div>

        {/* Hadith & Quran Button */}
        <div className="relative w-full">
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row gap-6 items-stretch">
            <div className="lg:flex-1 rounded-2xl">
              <Hadith />
            </div>
            <motion.div whileHover={{ scale: 1.05, rotate: 1 }} whileTap={{ scale: 0.97 }}
              className="lg:w-72 flex flex-col justify-center items-center rounded-2xl shadow-xl relative overflow-hidden font-bold text-lg">
              <div className="absolute inset-0 bg-cover bg-center blur-sm scale-110" style={{ backgroundImage: "url('/quranKarem.jpg')" }} />
              <div className="absolute inset-0 bg-black/60" />
              <Link href="/Pages/Quran" className="relative z-10 flex flex-col items-center gap-3 py-8">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-yellow-400/20 blur-xl"></div>
                  <BookOpen className="w-12 h-12 z-10 text-yellow-400 drop-shadow-lg" />
                </div>
                <span className="z-10 text-xl text-yellow-400 drop-shadow-lg tracking-wide">المصحف الشريف</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Books Grid */}
        <BooksGrid />
        {/* الطقس + الأذكار + السيرة */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
            className="lg:col-span-1 w-full min-h-[250px]">
            <WeatherWidgetPremium className="w-full h-full" />
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.45}}
            className="lg:col-span-2 w-full min-h-[250px] rounded-2xl ">
            <Counter className="w-full h-full" />
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
            className="lg:col-span-1 w-full min-h-[250px] rounded-2xl">
            <SeerahWidgetPro />
          </motion.div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

// ====== Books Grid (محلي لتقليل حجم الملف الرئيسي) ======
function BooksGrid() {
  const books = [
    { name: 'صحيح البخاري', slug: 'bukhary', color: 'from-yellow-500 to-amber-600', badge: 'حديث' },
    { name: 'صحيح مسلم', slug: 'muslim', color: 'from-blue-500 to-indigo-600', badge: 'حديث' },
    { name: 'سنن الترمذي', slug: 'tirmidhi', color: 'from-green-500 to-emerald-600', badge: 'حديث' },
    { name: 'حصن المسلم', slug: 'hisn', color: 'from-purple-500 to-pink-600', badge: 'أذكار' },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {books.map((book) => {
        const href = book.slug === 'hisn' ? `/Pages/Hisn` : `/Pages/Hadith/${book.slug}`
        return (
          <Link key={book.slug} href={href}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className={`relative rounded-2xl shadow-2xl p-6 h-44 flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br ${book.color} text-white cursor-pointer`}>
              <div className="absolute inset-0 opacity-15 bg-[url('/patterns/islamic-pattern.svg')] bg-cover" />
              <div className="absolute top-3 right-3 px-3 py-1 text-xs rounded-full bg-black/40 backdrop-blur-md">
                {book.badge}
              </div>
              <div className="relative flex items-center justify-center mb-3">
                <div className="absolute inset-0 w-16 h-16 rounded-full bg-white/20 blur-xl"></div>
              </div>
              <span className="relative z-10 font-bold text-lg tracking-wide drop-shadow-lg">
                {book.name}
              </span>
            </motion.div>
          </Link>
        )
      })}
    </div>
  )
}

// ====== Footer محلي للحفاظ على ملف واحد ======
function SiteFooter() {
  return (
    <footer className="border-t border-[#30363d]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-[#8b949e]">
        <p>﴿إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا﴾</p>
      </div>
    </footer>
  )
}
