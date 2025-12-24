'use client'
import React, { useState, useEffect } from 'react'
import { RotateCcw, Plus, Minus, Flower } from 'lucide-react'
import { motion } from 'framer-motion'

const MAX_COUNT = 100

const Counter = () => {
  const [num, setNum] = useState(0)

  useEffect(() => {
    const savedNum = localStorage.getItem('tasbeehCounter')
    if (savedNum) setNum(parseInt(savedNum))
  }, [])

  useEffect(() => {
    localStorage.setItem('tasbeehCounter', num)
  }, [num])

  const percentage = (num / MAX_COUNT) * 100

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-white border border-emerald-50 shadow-2xl shadow-emerald-900/5 group overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 bg-[url('/patterns/subtle-pattern.png')] opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -ml-16 -mt-16 group-hover:bg-emerald-100 transition-colors duration-700" />

        {/* Header */}
        <div className="relative z-10 text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flower className="text-emerald-500 animate-spin-slow" size={20} />
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">سَبّح بحمد ربك</h3>
          </div>
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            سُبْحان الله، الحمد لله، الله أكبر
          </p>
        </div>

        {/* Counter Circle */}
        <div className="relative flex items-center justify-center mb-8">
          <svg className="w-56 h-56 transform -rotate-90">
            <circle
              className="text-emerald-50"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
              r="90"
              cx="112"
              cy="112"
            />
            <motion.circle
              className="text-primary-green"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
              strokeLinecap="round"
              r="90"
              cx="112"
              cy="112"
              strokeDasharray={2 * Math.PI * 90}
              animate={{ strokeDashoffset: 2 * Math.PI * 90 * (1 - num / MAX_COUNT) }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <motion.span
              key={num}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl font-black text-slate-800 font-mono tracking-tighter"
            >
              {num}
            </motion.span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
              تسبيحة
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="relative z-10 flex items-center gap-6">
          <button
            onClick={() => setNum(num > 0 ? num - 1 : 0)}
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-emerald-100 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm"
          >
            <Minus size={24} />
          </button>

          <button
            onClick={() => setNum(num + 1)}
            className="w-24 h-24 flex items-center justify-center rounded-[2rem] bg-primary-green text-white shadow-xl shadow-emerald-900/20 hover:bg-emerald-800 transition-all transform active:scale-95"
          >
            <Plus size={40} />
          </button>

          <button
            onClick={() => setNum(0)}
            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-emerald-100 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm"
          >
            <RotateCcw size={24} />
          </button>
        </div>

        {/* Progress Bar Label */}
        <div className="relative z-10 mt-8 w-full max-w-[120px] flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>الهدف: {MAX_COUNT}</span>
        </div>
      </div>
    </div>
  )
}

export default Counter

