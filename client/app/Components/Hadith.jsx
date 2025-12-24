
// 'use client'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import { BookOpen, RefreshCw, Copy, Share2 } from 'lucide-react'
// import { FaRegCopy } from "react-icons/fa";
// import { IoShareSocialOutline } from "react-icons/io5";

// const Hadith = () => {
//   const [hadiths, setHadiths] = useState([])
//   const [hadithToday, setHadithToday] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [showEnglish, setShowEnglish] = useState(false)

//   const fetchHadiths = async () => {
//     try {
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/hadiths/all`)
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

//   const copyHadith = () => {
//     if (!hadithToday) return
//     const text = showEnglish ? hadithToday.hadithEnglish : hadithToday.hadithArabic
//     navigator.clipboard.writeText(text)
//     alert("تم نسخ الحديث ✅")
//   }

//   const shareHadith = () => {
//     if (!hadithToday) return
//     const text = showEnglish ? hadithToday.hadithEnglish : hadithToday.hadithArabic
//     if (navigator.share) {
//       navigator.share({
//         title: 'حديث اليوم',
//         text,
//         url: window.location.href
//       })
//     } else {
//       alert("المشاركة غير مدعومة في هذا المتصفح.")
//     }
//   }

//   useEffect(() => {
//     fetchHadiths()
//   }, [])

//   return (
//     <div dir="rtl" className="flex justify-center px-2 py-3 w-full h-full">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="w-full relative overflow-hidden rounded-3xl"
//       >
//         {/* خلفية مع زخارف إسلامية */}
//         <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-800 to-green-900 rounded-3xl shadow-2xl opacity-95">
//           <div className="absolute inset-0 bg-[url('/islambg.jpg')] opacity-10"></div>
//         </div>

//         <div className="relative z-10 p-8 rounded-3xl backdrop-blur-md border border-yellow-400/30 shadow-xl">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-3xl font-extrabold text-yellow-300 tracking-wide flex items-center gap-2">
//               <BookOpen className="w-7 h-7" />
//               حديث اليوم
//             </h1>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => pickRandomHadith()}
//                 disabled={loading}
//                 className="p-3 rounded-full bg-gradient-to-r from-green-500 to-yellow-400 shadow-lg hover:scale-110 hover:shadow-yellow-400/60 transition"
//               >
//                 <RefreshCw className={`w-6 h-6 text-white ${loading ? 'animate-spin' : ''}`} />
//               </button>
//               <button
//                 onClick={() => copyHadith()}
//                 disabled={loading}
//                 className="p-3 rounded-full bg-gradient-to-r from-green-500 to-yellow-400 shadow-lg hover:scale-110 hover:shadow-yellow-400/60 transition"
//               >
//                 <FaRegCopy className={`w-6 h-6 text-white ${loading ? 'animate-spin' : ''}`} />
//               </button>
//               <button
//                 onClick={() => shareHadith()}
//                 disabled={loading}
//                 className="p-3 rounded-full bg-gradient-to-r from-green-500 to-yellow-400 shadow-lg hover:scale-110 hover:shadow-yellow-400/60 transition"
//               >
//                 <IoShareSocialOutline className={`w-6 h-6 text-white ${loading ? 'animate-spin' : ''}`} />
//               </button>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="flex justify-center gap-4 mb-6">
//             <button
//               onClick={() => setShowEnglish(false)}
//               className={`px-6 py-2 rounded-full font-semibold transition ${
//                 !showEnglish ? 'bg-yellow-400 text-green-900 shadow-lg' : 'bg-white/20 text-white'
//               }`}
//             >
//               العربية
//             </button>
//             <button
//               onClick={() => setShowEnglish(true)}
//               className={`px-6 py-2 rounded-full font-semibold transition ${
//                 showEnglish ? 'bg-yellow-400 text-green-900 shadow-lg' : 'bg-white/20 text-white'
//               }`}
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
//                 className="space-y-6 text-center"
//               >
//                 <p className="text-sm text-white leading-relaxed font-[Amiri] max-h-64 overflow-y-auto px-4">
//                   {showEnglish ? hadithToday.hadithEnglish : hadithToday.hadithArabic}
//                 </p>

//                 {/* Divider زخرفي */}
//                 <div className="flex items-center justify-center gap-4">
//                   <span className="h-px w-16 bg-yellow-400/50"></span>
//                   <span className="text-yellow-400">✦</span>
//                   <span className="h-px w-16 bg-yellow-400/50"></span>
//                 </div>

//                 <p className="text-sm text-gray-200 italic">
//                   📖 {hadithToday.book?.bookName} <br />
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
import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, RefreshCw, Copy, Share2, Quote } from 'lucide-react'
import { useHadith } from '../Context/HadithContext'

const Hadith = () => {
  const {
    hadithToday,
    loading,
    error,
    showEnglish,
    setShowEnglish,
    pickRandomHadith,
    copyHadith,
    shareHadith,
  } = useHadith()

  return (
    <div dir="rtl" className="w-full h-full p-1">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-full min-h-[400px] flex flex-col rounded-[2.5rem] bg-white border border-emerald-50 shadow-2xl shadow-emerald-900/5 overflow-hidden group"
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('/patterns/subtle-pattern.png')] opacity-20" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-emerald-100 transition-colors duration-700" />

        {/* Header Section */}
        <div className="relative z-10 px-8 pt-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-green flex items-center justify-center text-white shadow-lg shadow-emerald-900/10 transform group-hover:rotate-6 transition-transform">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">حديث نبوي شريف</h2>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">من مشكاة النبوة</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[
              { icon: RefreshCw, onClick: pickRandomHadith, label: 'تحديث', spin: loading },
              { icon: Copy, onClick: copyHadith, label: 'نسخ' },
              { icon: Share2, onClick: shareHadith, label: 'مشاركة' }
            ].map((btn, idx) => (
              <button
                key={idx}
                onClick={btn.onClick}
                disabled={loading}
                title={btn.label}
                className="w-10 h-10 rounded-xl bg-white border border-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white hover:shadow-lg transition-all flex items-center justify-center group/btn"
              >
                <btn.icon size={18} className={btn.spin ? 'animate-spin' : ''} />
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 flex-1 px-8 py-6 flex flex-col justify-center">
          <div className="relative">
            <Quote className="absolute -top-6 -right-4 w-12 h-12 text-emerald-50 opacity-50 rotate-180" />

            <div className="transition-all duration-500">
              {loading ? (
                <div className="space-y-4">
                  <div className="h-4 bg-emerald-50 rounded-full w-full animate-pulse" />
                  <div className="h-4 bg-emerald-50 rounded-full w-11/12 animate-pulse" />
                  <div className="h-4 bg-emerald-50 rounded-full w-4/5 animate-pulse" />
                </div>
              ) : error ? (
                <p className="text-red-400 text-center font-medium">{error}</p>
              ) : hadithToday ? (
                <motion.div
                  key={hadithToday.id || hadithToday._id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <p className={`text-xl md:text-2xl leading-relaxed text-slate-700 text-center ${showEnglish ? 'font-sans' : 'font-quran'}`}>
                    {showEnglish ? hadithToday.hadithEnglish : hadithToday.hadithArabic}
                  </p>

                  {/* Book Citation */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
                    <p className="px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wide">
                      رواه {hadithToday.book?.bookName || 'في السنن'}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <p className="text-slate-400 text-center">لم يتم تحميل الحديث بعد</p>
              )}
            </div>

            <Quote className="absolute -bottom-6 -left-4 w-12 h-12 text-emerald-50 opacity-50" />
          </div>
        </div>

        {/* Footer Tabs */}
        <div className="relative z-10 p-6 flex justify-center border-t border-emerald-50 bg-emerald-50/30">
          <div className="inline-flex p-1 bg-white rounded-2xl border border-emerald-100 shadow-sm">
            {[
              { label: 'العربية', value: false },
              { label: 'English', value: true }
            ].map((tab) => (
              <button
                key={tab.label}
                onClick={() => setShowEnglish(tab.value)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${showEnglish === tab.value
                    ? 'bg-primary-green text-white shadow-md'
                    : 'text-slate-400 hover:text-emerald-600'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Hadith

