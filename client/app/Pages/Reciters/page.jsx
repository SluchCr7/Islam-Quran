'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {quranReciters} from '@/utils/quran'
import { BookOpen } from 'lucide-react'

export default function RecitersPage() {
  return (
    <div dir='rtl' className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8 text-center">
        أبرز الشيوخ والمقرئين
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {quranReciters.map((reciter , idx) => (
          <Link key={reciter.name} href={`/Pages/Reciter/${reciter.id}`}>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-slate-900 rounded-2xl shadow-xl overflow-hidden cursor-pointer group"
            >
              {/* الصورة */}
              <div className="h-56 w-full overflow-hidden rounded-t-2xl">
                <img
                  src={reciter.image || '/placeholder.jpg'}
                  alt={reciter.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay عند Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-90 transition flex flex-col justify-center items-center p-4 text-center">
                <p className="text-gray-200 mb-4 line-clamp-4">{reciter.bio}</p>
                <div className="flex gap-4">
                  <div className="bg-emerald-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-emerald-500 transition">
                    عرض التفاصيل
                  </div>
                  <div className="bg-yellow-500 px-4 py-2 rounded-full font-semibold text-sm hover:bg-yellow-400 transition flex items-center gap-1">
                    <BookOpen className="w-4 h-4" /> استمع
                  </div>
                </div>
              </div>

              {/* اسم الشيخ والبلد */}
              <div className="p-4 flex-1 flex flex-col justify-between relative z-10">
                <h2 className="text-xl font-bold text-emerald-400">{reciter.name}</h2>
                <p className="text-gray-400">{reciter.country}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}
