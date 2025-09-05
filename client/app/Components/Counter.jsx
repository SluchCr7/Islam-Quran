'use client'
import React, { useState, useEffect } from 'react'
import { RotateCcw, Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'

const MAX_COUNT = 100

const Counter = () => {
  const [num, setNum] = useState(0)

  // تحميل القيمة من localStorage
  useEffect(() => {
    const savedNum = localStorage.getItem('tasbeehCounter')
    if (savedNum) setNum(parseInt(savedNum))
  }, [])

  // حفظ القيمة عند التغيير
  useEffect(() => {
    localStorage.setItem('tasbeehCounter', num)
  }, [num])

  const text = {
    heading: 'سَبّح بحمد ربك',
    desc: "سُبْحان الله، الحمد لله، الله أكبر",
  }

  const percentage = (num / MAX_COUNT) * 33

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-xl p-8 text-center overflow-hidden rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-emerald-600 shadow-2xl">

        {/* خلفية النجوم */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-yellow-400 rounded-full w-1 h-1 opacity-50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
              animate={{ y: [0, 3, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 + Math.random() * 2 }}
            />
          ))}
        </div>

        {/* العنوان والوصف */}
        <h1 className="relative text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-emerald-400 tracking-wide drop-shadow-lg">
          {text.heading}
        </h1>
        <p className="relative mt-2 text-gray-300 text-base md:text-lg leading-relaxed drop-shadow-sm">
          {text.desc}
        </p>

        {/* العدّاد الدائري */}
        <div className="relative mt-6 flex justify-center items-center">
          <svg className="w-48 h-48">
            <circle
              className="text-gray-700"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="96"
              cy="96"
            />
            <motion.circle
              className="text-yellow-400"
              strokeWidth="8"
              stroke="url(#gradient)"
              fill="transparent"
              r="70"
              cx="96"
              cy="96"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={2 * Math.PI * 70 * (1 - num / MAX_COUNT)}
              initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - num / MAX_COUNT) }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 120 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          <motion.span
            key={num}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute text-4xl md:text-5xl font-extrabold text-yellow-300 drop-shadow-lg"
          >
            {num}
          </motion.span>
        </div>

        {/* شريط النسبة */}
        <div className="relative mt-4 w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.4 }}
            className="h-full bg-gradient-to-r from-yellow-400 to-emerald-500"
          ></motion.div>
        </div>
        <p className="mt-2 text-sm text-gray-400">{num} / {MAX_COUNT}</p>

        {/* الأزرار */}
        <div className="flex justify-center gap-6 mt-6 relative z-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setNum(num > 0 ? num - 1 : 0)}
            className="flex items-center justify-center w-16 h-16 text-white bg-red-600 rounded-full shadow-lg border-2 border-yellow-400 hover:bg-red-700 transition-transform"
          >
            <Minus size={28} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setNum(num + 1 <= MAX_COUNT ? num + 1 : num)}
            className="flex items-center justify-center w-16 h-16 text-white bg-green-600 rounded-full shadow-lg border-2 border-yellow-400 hover:bg-green-700 transition-transform"
          >
            <Plus size={28} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setNum(0)}
            className="flex items-center justify-center w-16 h-16 text-black bg-yellow-500 rounded-full shadow-lg border-2 border-green-600 hover:bg-yellow-600 transition-transform"
          >
            <RotateCcw size={28} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Counter
