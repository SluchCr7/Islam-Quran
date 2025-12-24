'use client'
import { motion } from 'framer-motion'
import { Clock, MapPin, Bell } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

export function NextPrayerCard({ next, prev }) {
  const [timeLeft, setTimeLeft] = useState('00:00:00')
  const [progress, setProgress] = useState(0)

  const label = useMemo(() => next?.label ?? '—', [next?.label])

  useEffect(() => {
    if (!next?.time) return

    const nextTime = next.time.getTime()
    const prevTime = prev?.time ? prev.time.getTime() : Date.now()
    const total = Math.max(1, nextTime - prevTime)

    const tick = () => {
      const now = Date.now()
      const diff = Math.max(0, nextTime - now)

      if (diff <= 0) {
        setTimeLeft('00:00:00')
        setProgress(100)
        return
      }

      const h = String(Math.floor(diff / 3_600_000)).padStart(2, '0')
      const m = String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, '0')
      const s = String(Math.floor((diff % 60_000) / 1000)).padStart(2, '0')
      setTimeLeft(`${h}:${m}:${s}`)

      setProgress(((total - diff) / total) * 100)
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [next?.time, prev?.time])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-[2rem] h-full overflow-hidden shadow-2xl bg-primary-green text-white group"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[url('/patterns/hero-bg.png')] bg-cover mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-green via-primary-green/90 to-emerald-900"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between p-8 gap-10">
        {/* Left Side: Progress & Label */}
        <div className="relative w-48 h-48 shrink-0">
          <svg className="w-full h-full -rotate-90">
            <circle cx="96" cy="96" r="80" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
            <motion.circle
              cx="96"
              cy="96"
              r="80"
              stroke="url(#goldGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: 502, strokeDashoffset: 502 }}
              animate={{ strokeDashoffset: 502 - (502 * progress) / 100 }}
              transition={{ duration: 0.5, ease: 'linear' }}
            />
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Bell className="w-5 h-5 text-gold-accent mb-1" />
            </motion.div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200 font-semibold mb-1">الصلاة القادمة</p>
            <p className="text-3xl font-bold gold-text drop-shadow-sm">{label}</p>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 flex flex-col items-center lg:items-start w-full">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/5 mb-4 backdrop-blur-sm">
            <Clock className="h-3.5 w-3.5 text-gold-accent" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">الوقت المتبقي للأذان</span>
          </div>
          
          <h2 className="text-6xl font-black tracking-tighter sm:text-7xl font-mono text-white mb-4 drop-shadow-md">
            {timeLeft}
          </h2>

          <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-white/10">
            <div>
              <p className="text-[10px] text-emerald-300 uppercase tracking-wider mb-1">موعد الأذان</p>
              <p className="text-lg font-bold">
                {next?.time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || '--:--'}
              </p>
            </div>
            {prev && (
              <div className="text-right lg:text-left">
                <p className="text-[10px] text-emerald-300 uppercase tracking-wider mb-1">الصلاة السابقة</p>
                <p className="text-lg font-bold opacity-80">
                  {prev.label} — {prev.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/patterns/subtle-pattern.png')] opacity-5 pointer-events-none"></div>
    </motion.div>
  )
}

