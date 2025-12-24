'use client'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function QuranViewer() {
  const [ayahs, setAyahs] = useState([]);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah/1/quran-uthmani")
      .then(res => res.json())
      .then(data => setAyahs(data.data.ayahs));
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-cream-bg flex flex-col items-center py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white rounded-[3rem] shadow-2xl shadow-emerald-900/5 border border-emerald-50 overflow-hidden"
      >
        <div className="p-12 text-center space-y-8">
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-emerald-50 text-primary-green text-sm font-black tracking-widest uppercase">
            سورة الفاتحة
          </div>

          <div className="font-quran text-4xl leading-[2.5] text-slate-800 text-justify">
            <span className="block text-center text-5xl mb-12 text-primary-green">بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ</span>
            {ayahs.map((ayah) => (
              <span key={ayah.number} className="hover:text-primary-green transition-colors duration-300">
                {ayah.text.replace('بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ', '')}
                <span className="inline-flex items-center justify-center w-10 h-10 mx-2 text-gold-accent border-2 border-gold-accent/20 rounded-full text-lg font-bold">
                  {ayah.numberInSurah}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="h-4 bg-gradient-to-r from-transparent via-gold-accent/20 to-transparent" />
      </motion.div>
    </div>
  );
}

