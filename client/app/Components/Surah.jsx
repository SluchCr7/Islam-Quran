'use client'
import React, { useEffect, useState } from "react";

export default function QuranViewer() {
  const [ayahs, setAyahs] = useState([]);

  useEffect(() => {
    // مثال: سورة الفاتحة (السورة 1)
    fetch("https://api.alquran.cloud/v1/surah/1/quran-uthmani")
      .then(res => res.json())
      .then(data => setAyahs(data.data.ayahs));
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-[url('/quran-bg.png')] bg-cover bg-fixed flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">سورة الفاتحة</h1>
      
      <div className="quran-text bg-white/80 rounded-2xl shadow-xl p-8 max-w-3xl leading-loose text-2xl text-gray-900 text-center">
        {ayahs.map((ayah) => (
          <span key={ayah.number} className="px-1">
            {ayah.text}
            <span className="text-green-700">﴿{ayah.numberInSurah}﴾ </span>
          </span>
        ))}
      </div>
    </div>
  );
}
