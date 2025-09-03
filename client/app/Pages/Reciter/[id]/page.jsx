'use client'
import React, { useState } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { quranReciters } from '@/utils/quran'
import { Speaker } from 'lucide-react'

export default function ReciterPage({ params }) {
  const reciterId = Number(params.id);
  const reciter = quranReciters.find(r => r.id === reciterId);
  const [showFullBio, setShowFullBio] = useState(false);

  if (!reciter) return notFound();

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-white px-6 py-12 space-y-12">

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 relative">
          <img
            src={reciter.image || '/placeholder.jpg'}
            alt={reciter.name}
            className="w-full h-full object-cover"
          />
          <button className="absolute bottom-2 right-2 bg-emerald-500 p-3 rounded-full shadow-lg hover:bg-emerald-400 transition">
            <Speaker size={24} />
          </button>
        </div>
        <div className="flex-1 space-y-2">
          <h1 className="text-5xl font-extrabold text-emerald-400">{reciter.name}</h1>
          <p className="text-gray-400 text-lg">{reciter.country}</p>
          <p className="text-gray-300 text-lg">
            {reciter.birth ? `تاريخ الميلاد: ${reciter.birth}` : ''}
            {reciter.death ? ` - تاريخ الوفاة: ${reciter.death}` : ''}
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <section className="bg-gray-900 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">السيرة الذاتية</h2>
        <p className={`text-gray-200 transition-all ${showFullBio ? '' : 'line-clamp-5'}`}>
          {reciter.bio}
        </p>
        {reciter.bio?.length > 300 && (
          <button
            onClick={() => setShowFullBio(!showFullBio)}
            className="mt-2 text-emerald-400 hover:underline"
          >
            {showFullBio ? 'إخفاء' : 'قراءة المزيد'}
          </button>
        )}
      </section>

      {/* اقتراح أقسام جديدة */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-2xl p-4 shadow-lg">
          <h3 className="text-xl font-bold text-emerald-400 mb-2">تلاواته</h3>
          <p className="text-gray-200">قائمة السور المسجلة بصوته مع زر تشغيل.</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 shadow-lg">
          <h3 className="text-xl font-bold text-emerald-400 mb-2">إنجازاته</h3>
          <p className="text-gray-200">عدد المصاحف المسجلة، سنوات النشاط، الجوائز.</p>
        </div>
        <div className="bg-gray-900 rounded-2xl p-4 shadow-lg">
          <h3 className="text-xl font-bold text-emerald-400 mb-2">وسائط إضافية</h3>
          <p className="text-gray-200">مقابلات، محاضرات، فيديوهات.</p>
        </div>
      </section>

      {/* Related Reciters Section */}
      <section>
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">قراء مشابهون</h2>
        <div className="flex gap-4 overflow-x-auto">
          {quranReciters.filter(r => r.id !== reciter.id).slice(0, 5).map(r => (
            <div key={r.id} className="flex-shrink-0 w-40 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition">
              <img src={r.image || '/placeholder.jpg'} alt={r.name} className="w-full h-40 object-cover"/>
              <p className="text-center text-gray-200 p-2">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
