'use client'
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, BellRing, Sparkles, ArrowDown, ChevronRight } from 'lucide-react'
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
import { BooksGrid } from './Components/BooksGrid'
import { SiteFooter } from './Components/SiteFooter'
import SeerahWidgetPro from './Components/SeerhaWedgit'

const canUseDOM = () => typeof window !== 'undefined'

function buildTodaySchedule(prayers) {
  if (!prayers) return { list: [], next: null, prev: null }

  const now = new Date()
  const parse = (t) => (t ? new Date(`${now.toDateString()} ${t}`) : null)

  const list = [
    { key: 'Fajr', label: PRAYER_META.Fajr.ar, time: parse(prayers.Fajr) },
    { key: 'Dhuhr', label: PRAYER_META.Dhuhr.ar, time: parse(prayers.Dhuhr) },
    { key: 'Asr', label: PRAYER_META.Asr.ar, time: parse(prayers.Asr) },
    { key: 'Maghrib', label: PRAYER_META.Maghrib.ar, time: parse(prayers.Maghrib) },
    { key: 'Isha', label: PRAYER_META.Isha.ar, time: parse(prayers.Isha) },
  ].filter((p) => p.time instanceof Date && !isNaN(p.time.getTime()))

  if (!list.length) return { list: [], next: null, prev: null }

  const upcoming = list.find((p) => p.time > now)
  const previous = [...list].reverse().find((p) => p.time <= now)

  if (!upcoming) {
    const fajr = list[0]
    const tmr = new Date(fajr.time)
    tmr.setDate(tmr.getDate() + 1)
    return {
      list,
      next: { ...fajr, time: tmr },
      prev: list[list.length - 1]
    }
  }

  return {
    list,
    next: upcoming,
    prev: previous ?? list[list.length - 1]
  }
}

// ========== Main Page ==========
export default function IslamicDashboard() {
  const { prayers, info } = usePrayer()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!canUseDOM()) return
    const saved = window.localStorage.getItem('adhan-enabled')
    if (saved === 'true') setEnabled(true)
  }, [])

  const { list: todayList, next, prev } = useMemo(() => buildTodaySchedule(prayers), [prayers])

  // Adhan Logic
  const adhanTimerRef = useRef(null)
  const audioRef = useRef(canUseDOM() ? new Audio() : null)

  useEffect(() => {
    if (adhanTimerRef.current) clearTimeout(adhanTimerRef.current)
    if (!enabled || !next) return

    const now = new Date()
    const target = new Date(next.time)
    const diff = target.getTime() - now.getTime()
    if (diff <= 0) return

    adhanTimerRef.current = setTimeout(async () => {
      try {
        if (canUseDOM() && 'Notification' in window && Notification.permission === 'granted') {
          new Notification('🕌 وقت الصلاة', {
            body: `حان الآن موعد ${next.label}`,
            icon: '/mosque.png',
          })
        }
        if (audioRef.current) {
          audioRef.current.src = `/adhan/${next.key}.mp3`
          await audioRef.current.play().catch(() => { })
        }
      } finally { }
    }, diff)

    return () => { if (adhanTimerRef.current) clearTimeout(adhanTimerRef.current) }
  }, [enabled, next])

  const handleEnable = useCallback(async () => {
    try {
      if (canUseDOM() && 'Notification' in window && Notification.permission !== 'granted') {
        await Notification.requestPermission()
      }
      const test = new Audio('/adahn2.mp3')
      await test.play().catch(() => { })
      setEnabled(true)
      if (canUseDOM()) window.localStorage.setItem('adhan-enabled', 'true')
    } catch (err) { }
  }, [])

  if (!info || !info.date || !prayers) {
    return (
      <div dir="rtl" className="flex flex-col items-center justify-center min-h-screen bg-[#FDFCF0] text-primary-green">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
          <div className="w-20 h-20 rounded-full border-4 border-emerald-100 border-t-primary-green animate-spin mx-auto" />
          <h1 className="text-2xl font-bold font-quran">بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ</h1>
          <p className="text-slate-400">جاري تحميل الرحمة والسكينة...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div dir="rtl" className="relative min-h-screen overflow-x-hidden pt-20 bg-[#FDFCF0]">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden mb-16 px-4">
        {/* Hero Background */}
        <div className="absolute inset-x-4 top-0 bottom-8 rounded-[4rem] overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-primary-green" />
          <img
            src="/patterns/hero-bg.png"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-green via-primary-green/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-200 text-xs font-black tracking-[0.2em] uppercase"
          >
            <Sparkles size={14} className="text-gold-accent" />
            <span>مرحباً بك في عالم السكينة</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-8xl font-black text-white leading-[1.1] drop-shadow-2xl"
          >
            نورٌ يُضيء <br /><span className="text-gold-accent">طريقك</span>
            إلى <span className="underline decoration-gold-accent/40 underline-offset-8">طاعة الله</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-emerald-50/70 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            رفيقك الدائم لمواقيت الصلاة، تلاوة القرآن الكريم، واستحضار الأذكار بتصميم عصري يجمع بين الأصالة والحداثة.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 pt-8"
          >
            <Link href="/Pages/Quran" className="px-10 py-5 bg-gold-accent text-primary-green font-black rounded-3xl shadow-2xl shadow-black/20 hover:bg-white hover:-translate-y-1 transition-all flex items-center gap-3 group">
              <BookOpen size={20} />
              <span>ابدأ التلاوة</span>
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            {!enabled && (
              <button
                onClick={handleEnable}
                className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-3xl hover:bg-white/20 hover:-translate-y-1 transition-all flex items-center gap-3"
              >
                <BellRing size={20} className="text-gold-accent" />
                <span>تفعيل الأذان</span>
              </button>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-emerald-200/40"
        >
          <ArrowDown size={28} />
        </motion.div>
      </section>

      <main className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 space-y-32 pb-32 relative z-10">
        {/* Section 1: Prayer Times */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-r-8 border-gold-accent pr-8">
            <div>
              <h2 className="text-4xl font-black text-slate-800">مواقيت الصلاة</h2>
              <p className="text-slate-400 font-bold text-lg mt-2">حافظ على صلاتك في وقتها لتحفظ راحتك</p>
            </div>
            <div className="bg-emerald-50 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-600 border border-emerald-100 shadow-sm">
              الدقة مبنية على موقعك الحالي
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7">
              <NextPrayerCard next={next} prev={prev} />
            </div>
            <div className="lg:col-span-5">
              <InfoCard info={info} />
            </div>
          </div>

          <PrayerCardsGrid todayList={todayList} nextKey={next?.key} PRAYER_META={PRAYER_META} PRAYER_BG={PRAYER_BG} />
        </section>

        {/* Section 2: Core Features */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2">
            <div className="mb-8 border-r-8 border-emerald-500 pr-8">
              <h3 className="text-3xl font-black text-slate-800">تلاوة مباركة</h3>
              <p className="text-slate-400 font-bold mt-2">استمع وشاهد القرآن الكريم بأصوات نخبة القراء</p>
            </div>
            <QuranPlayer className="shadow-2xl shadow-emerald-900/10 rounded-[3rem]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-1">
            <div className="mb-8 border-r-8 border-emerald-300 pr-8">
              <h3 className="text-3xl font-black text-slate-800">القبلة</h3>
              <p className="text-slate-400 font-bold mt-2">حدد اتجاه صلاتك بدقة</p>
            </div>
            <QiblaCompass className="shadow-2xl shadow-emerald-900/10 rounded-[3rem]" />
          </motion.div>
        </section>

        {/* Section 3: Daily Inspiration */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <Hadith />
          </div>
          <div className="lg:col-span-4 h-full">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative h-full rounded-[3rem] overflow-hidden group shadow-2xl shadow-emerald-900/10"
            >
              <img src="/quranKarem.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-green via-primary-green/60 to-transparent" />
              <Link href="/Pages/Quran" className="absolute inset-0 flex flex-col items-center justify-end p-12 text-white text-center">
                <div className="w-20 h-20 rounded-full bg-gold-accent flex items-center justify-center text-primary-green mb-8 shadow-2xl shadow-black/20 group-hover:rotate-12 transition-transform">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-4xl font-black mb-3">المصحف الشريف</h3>
                <p className="text-emerald-100/70 font-bold uppercase tracking-widest text-xs">قراءة، تفسير، واستماع</p>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Tools & Books */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-slate-800">المكتبة الإسلامية</h2>
            <p className="text-slate-400 font-bold text-lg">أدوات إضافية ومصادر موثوقة لليوم والليل</p>
          </div>
          <BooksGrid />
        </section>

        {/* Section 5: Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <WeatherWidgetPremium />
          <div className="md:col-span-2">
            <Counter />
          </div>
          <SeerahWidgetPro />
        </section>

        {/* Section 6: Calendar */}
        <section className="rounded-[4rem] overflow-hidden border border-emerald-50 shadow-2xl shadow-emerald-900/5 bg-white p-12 relative">
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -ml-32 -mt-32 opacity-40" />
          <div className="mb-12 border-r-8 border-gold-accent pr-8 relative z-10">
            <h3 className="text-3xl font-black text-slate-800">التقويم الهجري</h3>
            <p className="text-slate-400 font-bold mt-2">متابعة الأيام والمناسبات الإسلامية العظيمة</p>
          </div>
          <div className="relative z-10">
            <CalenderHijri />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

