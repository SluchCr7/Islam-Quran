'use client'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export function NextPrayerCard({ next, prev }) {
  const [timeLeft, setTimeLeft] = useState('00:00:00')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!next?.time) return
    const tick = () => {
      const now = new Date()
      const start = prev?.time ?? new Date(now)
      const total = Math.max(1, next.time.getTime() - start.getTime())
      const diff = Math.max(0, next.time.getTime() - now.getTime())

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

  const label = next?.label ?? '—'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl overflow-hidden shadow-2xl p-6 bg-gradient-to-br from-green-800 via-green-900 to-green-700 text-white"
    >
      {/* Pattern الخلفية */}
      <div className="absolute inset-0 opacity-10 bg-[url('/patterns/islamic-bg.svg')] bg-cover"></div>

      <div className="relative flex flex-col lg:flex-row items-center gap-6">
        {/* دائرة التقدم */}
        <div className="relative w-40 h-40 shrink-0">
          <svg className="w-full h-full -rotate-90">
            <circle cx="80" cy="80" r="70" stroke="#1f2937" strokeWidth="10" fill="none" />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#gradient)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: 440, strokeDashoffset: 440 }}
              animate={{ strokeDashoffset: 440 - (440 * progress) / 100 }}
              transition={{ duration: 0.8, ease: 'linear' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 grid place-items-center place-content-center text-center">
            <p className="text-sm text-gray-300">الصلاة القادمة</p>
            <p className="text-xl font-extrabold text-yellow-400">{label}</p>
          </div>
        </div>

        {/* تفاصيل الوقت */}
        <div className="flex-1 flex flex-col items-center lg:items-start">
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <Clock className="h-4 w-4" />
            <span>الوقت المتبقي</span>
          </div>
          <p className="text-4xl font-black text-emerald-400 font-mono">{timeLeft}</p>

          {next?.time && (
            <p className="mt-3 text-sm text-gray-300">
              موعد الأذان عند {next.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}

          {prev?.time && (
            <p className="mt-1 text-xs text-gray-400">
              الصلاة السابقة: {prev.label} - {prev.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
