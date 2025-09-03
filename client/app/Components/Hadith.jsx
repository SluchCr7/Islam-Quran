// 'use client'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import { BookOpen, RefreshCw } from 'lucide-react'

// const Hadith = () => {
//   const [hadiths, setHadiths] = useState([])
//   const [hadithToday, setHadithToday] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [showEnglish, setShowEnglish] = useState(false) // للتحويل بين العربية والإنجليزية

//   const fetchHadiths = async () => {
//     try {
//       const res = await axios.get('http://localhost:3001/api/hadiths/all')
//       setHadiths(res.data.hadiths.data)
//       if (res.data.hadiths.data.length > 0) {
//         pickRandomHadith(res.data.hadiths.data)
//       }
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const pickRandomHadith = (list = hadiths) => {
//     if (!list || list.length === 0) return
//     setLoading(true)
//     setTimeout(() => {
//       const randomIndex = Math.floor(Math.random() * list.length)
//       setHadithToday(list[randomIndex])
//       setLoading(false)
//     }, 400)
//   }

//   useEffect(() => {
//     fetchHadiths()
//   }, [])

//   return (
//     <div dir='rtl' className="flex justify-center px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="w-full max-w-3xl relative overflow-hidden"
//       >
//         {/* Card الخلفية */}
//         <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-800 to-green-900 rounded-3xl shadow-2xl opacity-90"></div>
//         <div className="relative z-10 p-8 rounded-3xl backdrop-blur-sm">

//           {/* Header + زر التحديث */}
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-2xl font-bold text-white flex items-center gap-2">
//               <BookOpen className="w-6 h-6" />
//               حديث اليوم
//             </h1>
//             <button
//               onClick={() => pickRandomHadith()}
//               disabled={loading}
//               className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white shadow-lg transition transform hover:rotate-180 duration-500"
//             >
//               <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
//             </button>
//           </div>

//           {/* Tabs للغات */}
//           <div className="flex justify-center gap-4 mb-6">
//             <button
//               onClick={() => setShowEnglish(false)}
//               className={`px-4 py-2 rounded-full font-semibold transition ${!showEnglish ? 'bg-white text-green-800' : 'bg-white/20 text-white'}`}
//             >
//               العربية
//             </button>
//             <button
//               onClick={() => setShowEnglish(true)}
//               className={`px-4 py-2 rounded-full font-semibold transition ${showEnglish ? 'bg-white text-green-800' : 'bg-white/20 text-white'}`}
//             >
//               English
//             </button>
//           </div>

//           {/* نص الحديث */}
//           <div className="relative">
//             {hadithToday ? (
//               <motion.div
//                 key={hadithToday.id || hadithToday._id}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6 }}
//                 className="space-y-4 text-center"
//               >
//                 <p className="text-lg text-white leading-relaxed font-[Cairo]">
//                   {showEnglish ? hadithToday.hadithEnglish : hadithToday.hadithArabic}
//                 </p>

//                 <p className="text-sm text-gray-200 italic">
//                   📖 {hadithToday.book?.bookName} - الراوي: {showEnglish ? hadithToday.englishNarrator : hadithToday.urduNarrator || hadithToday.arabicNarrator}
//                 </p>
//               </motion.div>
//             ) : (
//               <p className="text-gray-200 text-center">جاري تحميل الحديث...</p>
//             )}
//           </div>

//         </div>
//       </motion.div>
//     </div>
//   )
// }

// export default Hadith

'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, RefreshCw, Copy, Share2 } from 'lucide-react'

const Hadith = () => {
  const [hadiths, setHadiths] = useState([])
  const [hadithToday, setHadithToday] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showEnglish, setShowEnglish] = useState(false)

  const fetchHadiths = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/hadiths/all`)
      setHadiths(res.data.hadiths.data)
      if (res.data.hadiths.data.length > 0) {
        pickRandomHadith(res.data.hadiths.data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const pickRandomHadith = (list = hadiths) => {
    if (!list || list.length === 0) return
    setLoading(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * list.length)
      setHadithToday(list[randomIndex])
      setLoading(false)
    }, 400)
  }

  const copyHadith = () => {
    if (!hadithToday) return
    const text = showEnglish ? hadithToday.hadithEnglish : hadithToday.hadithArabic
    navigator.clipboard.writeText(text)
    alert("تم نسخ الحديث ✅")
  }

  const shareHadith = () => {
    if (!hadithToday) return
    const text = showEnglish ? hadithToday.hadithEnglish : hadithToday.hadithArabic
    if (navigator.share) {
      navigator.share({
        title: 'حديث اليوم',
        text,
        url: window.location.href
      })
    } else {
      alert("المشاركة غير مدعومة في هذا المتصفح.")
    }
  }

  useEffect(() => {
    fetchHadiths()
  }, [])

  return (
    <div dir="rtl" className="flex justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl relative overflow-hidden rounded-3xl"
      >
        {/* خلفية مع زخارف إسلامية */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-800 to-green-900 rounded-3xl shadow-2xl opacity-95">
          <div className="absolute inset-0 bg-[url('/islambg.jpg')] opacity-10"></div>
        </div>

        <div className="relative z-10 p-8 rounded-3xl backdrop-blur-md border border-yellow-400/30 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold text-yellow-300 tracking-wide flex items-center gap-2">
              <BookOpen className="w-7 h-7" />
              حديث اليوم
            </h1>
            <button
              onClick={() => pickRandomHadith()}
              disabled={loading}
              className="p-3 rounded-full bg-gradient-to-r from-green-500 to-yellow-400 shadow-lg hover:scale-110 hover:shadow-yellow-400/60 transition"
            >
              <RefreshCw className={`w-6 h-6 text-white ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setShowEnglish(false)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                !showEnglish ? 'bg-yellow-400 text-green-900 shadow-lg' : 'bg-white/20 text-white'
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => setShowEnglish(true)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                showEnglish ? 'bg-yellow-400 text-green-900 shadow-lg' : 'bg-white/20 text-white'
              }`}
            >
              English
            </button>
          </div>

          {/* نص الحديث */}
          <div className="relative">
            {hadithToday ? (
              <motion.div
                key={hadithToday.id || hadithToday._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 text-center"
              >
                <p className="text-xl text-white leading-relaxed font-[Amiri] max-h-64 overflow-y-auto px-4">
                  {showEnglish ? hadithToday.hadithEnglish : hadithToday.hadithArabic}
                </p>

                {/* Divider زخرفي */}
                <div className="flex items-center justify-center gap-4">
                  <span className="h-px w-16 bg-yellow-400/50"></span>
                  <span className="text-yellow-400">✦</span>
                  <span className="h-px w-16 bg-yellow-400/50"></span>
                </div>

                <p className="text-sm text-gray-200 italic">
                  📖 {hadithToday.book?.bookName} <br />
                  ✍️ الراوي: {showEnglish ? hadithToday.englishNarrator : hadithToday.arabicNarrator}
                </p>
              </motion.div>
            ) : (
              <p className="text-gray-200 text-center">جاري تحميل الحديث...</p>
            )}
          </div>

          {/* أزرار إضافية */}
          {hadithToday && (
            <div className="mt-8 flex justify-center gap-6">
              <button
                onClick={copyHadith}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white shadow transition"
              >
                <Copy className="w-4 h-4" /> نسخ
              </button>
              <button
                onClick={shareHadith}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white shadow transition"
              >
                <Share2 className="w-4 h-4" /> مشاركة
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Hadith
