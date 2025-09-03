'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
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
import { cn } from "@/lib/utils";
import AsmaulHusnaMarquee from './Components/AsmaaAllah'
import { Mosque, HandsPraying, Library } from "lucide-react";
export default function IslamicDashboard() {
  const { prayers, info } = usePrayer()
  const [offset, setOffset] = useState(0);

  // تحديث offset عند التمرير لتحريك الشبكة
  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * 0.1)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => console.log(info), [info])

  const todayList = useMemo(() => {
    if (!prayers) return []
    const now = new Date()
    const parse = (t) => (t ? new Date(`${now.toDateString()} ${t}`) : null)
    return [
      { key: 'Fajr', label: PRAYER_META.Fajr.ar, time: parse(prayers.Fajr) },
      { key: 'Dhuhr', label: PRAYER_META.Dhuhr.ar, time: parse(prayers.Dhuhr) },
      { key: 'Asr', label: PRAYER_META.Asr.ar, time: parse(prayers.Asr) },
      { key: 'Maghrib', label: PRAYER_META.Maghrib.ar, time: parse(prayers.Maghrib) },
      { key: 'Isha', label: PRAYER_META.Isha.ar, time: parse(prayers.Isha) },
    ].filter((p) => p.time instanceof Date && !isNaN(p.time.getTime()))
  }, [prayers])

  const { next, prev } = useMemo(() => {
    const now = new Date()
    const upcoming = todayList.find((p) => p.time > now)
    const previous = [...todayList].reverse().find((p) => p.time <= now)

    if (!todayList.length) return { next: null, prev: null }

    if (!upcoming) {
      const fajr = todayList[0]
      const tmr = new Date(fajr.time)
      tmr.setDate(tmr.getDate() + 1)
      return { next: { ...fajr, time: tmr }, prev: todayList[todayList.length - 1] }
    }
    return { next: upcoming, prev: previous ?? todayList[todayList.length - 1] }
  }, [todayList])

  const books = [
    { name: "صحيح البخاري", slug: "bukhary", color: "from-yellow-500 to-amber-600",  badge: "حديث" },
    { name: "صحيح مسلم", slug: "muslim", color: "from-blue-500 to-indigo-600",  badge: "حديث" },
    { name: "سنن الترمذي", slug: "tirmidhi", color: "from-green-500 to-emerald-600",  badge: "حديث" },
    { name: "حصن المسلم", slug: "hisn", color: "from-purple-500 to-pink-600",  badge: "أذكار" },
  ];

  if (!info || !info.date) {
      return (
        <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-3xl font-bold text-yellow-400">مرحباً بك 👋</h1>
            <p className="text-lg text-gray-300">
              جاري تحميل بيانات اليوم الهجري والمواقيت...
            </p>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent mx-auto"></div>
          </motion.div>
        </div>
      )
    }

  return (
    <div dir="rtl" className="relative min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-[#e6edf3] font-sans overflow-x-hidden">

      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 [background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)]",
            "opacity-10 lg:opacity-20",
            "[mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]",
            "transition-transform duration-500 ease-out"
          )}
          style={{ transform: `translateY(${offset}px)` }}
        />
      </div>

      <SiteHeader />

      <main className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* Prayer & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NextPrayerCard next={next} prev={prev} />
          <InfoCard info={info} />
        </div>

        {/* Prayer Grid */}
        <PrayerCardsGrid todayList={todayList} nextKey={next?.key} PRAYER_META={PRAYER_META} PRAYER_BG={PRAYER_BG} />

        {/* Quran & Compass */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-h-[400px]">
          <div className="lg:col-span-2 w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <QuranPlayer className="w-full h-full min-h-[400px]" />
          </div>
          <div className="lg:col-span-1 w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <QiblaCompass className="w-full h-full min-h-[400px]" />
          </div>
        </div>

        {/* Hijri Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-2xl overflow-hidden shadow-xl"
        >
          <CalenderHijri />
        </motion.div>

        {/* Hadith Section & Quran Button */}
        <div className="relative w-full">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row gap-6"
          >
            {/* Hadith */}
            <div className="lg:flex-1 backdrop-blur-lg bg-slate-900/60 p-2 rounded-2xl shadow-xl min-h-[300px] flex flex-col">
              <Hadith />
            </div>

            {/* Quran Button */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
              className="lg:w-64 flex flex-col justify-center items-center p-6 rounded-2xl shadow-xl relative overflow-hidden font-bold text-lg"
            >
              {/* خلفية المصحف */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
                style={{ backgroundImage: "url('/quranKarem.jpg')" }}
              />
              
              {/* طبقة تعتيم */}
              <div className="absolute inset-0 bg-black/60" />

              {/* المحتوى */}
              <Link href="/Pages/Quran" className="relative z-10 flex flex-col items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 w-20 h-20 rounded-full bg-yellow-400/20 blur-xl"></div>
                  <BookOpen className="w-12 h-12 z-10 text-yellow-400 drop-shadow-lg" />
                </div>
                <span className="z-10 text-xl text-yellow-400 drop-shadow-lg tracking-wide">
                  المصحف الشريف
                </span>
              </Link>
            </motion.div>

          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => {
            const href = book.slug === "hisn" ? `/Pages/Hisn` : `/Pages/Hadith/${book.slug}`;
            return (
              <Link key={book.slug} href={href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative rounded-2xl shadow-2xl p-6 h-44 flex flex-col justify-center items-center 
                              overflow-hidden bg-gradient-to-br ${book.color} text-white cursor-pointer`}
                >
                  {/* زخرفة خلفية */}
                  <div className="absolute inset-0 opacity-15 bg-[url('/patterns/islamic-pattern.svg')] bg-cover" />

                  {/* Badge علوي */}
                  <div className="absolute top-3 right-3 px-3 py-1 text-xs rounded-full bg-black/40 backdrop-blur-md">
                    {book.badge}
                  </div>

                  {/* أيقونة */}
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="relative flex items-center justify-center mb-3"
                  >
                    <div className="absolute inset-0 w-16 h-16 rounded-full bg-white/20 blur-xl"></div>
                    {/* {book.icon} */}
                  </motion.div>

                  {/* اسم الكتاب */}
                  <span className="relative z-10 font-bold text-lg tracking-wide drop-shadow-lg">
                    {book.name}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Grid الطقس + أسماء الله الحسنى + السيرة */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* الطقس */}
          <div className="lg:col-span-1 w-full min-h-[300px] flex">
            <WeatherWidgetPremium className="w-full h-full" />
          </div>

          {/* أسماء الله الحسنى */}
          <div className="lg:col-span-2 w-full min-h-[300px] flex">
            <Counter className="w-full h-full" />
          </div>

          {/* السيرة النبوية */}
          <div className="lg:col-span-1 w-full min-h-[300px] flex">
            <SeerahWidgetPro />
          </div>
        </div>

      </main>
      <AsmaulHusnaMarquee/>
      <SiteFooter />
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-[#30363d]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-[#8b949e]">
        <p>﴿إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا﴾</p>
      </div>
    </footer>
  )
}
