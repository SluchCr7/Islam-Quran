// "use client"
// import React, { useEffect, useState } from "react"
// import dynamic from "next/dynamic"
// import { motion } from "framer-motion"
// import { ArrowLeft, ArrowRight, BookOpen, Sun, Moon } from "lucide-react"
// import { CiMenuBurger } from "react-icons/ci"
// import SideMenu from "@/app/Components/MenuQuran"

// function Mushaf() {
//   const totalPages = 604
//   const [page, setPage] = useState(1)
//   const [ayahs, setAyahs] = useState([])
//   const [surahs, setSurahs] = useState([])
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [jumpPage, setJumpPage] = useState("")
//   const [theme, setTheme] = useState("dark")
//   const [bookmark, setBookmark] = useState(null)

//   const edition = "quran-uthmani"

//   // ✅ تحميل البيانات من localStorage بأمان
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const saved = JSON.parse(localStorage.getItem("bookmark"))
//       if (saved) setBookmark(saved)

//       const last = localStorage.getItem("lastPage")
//       if (last) setPage(Number(last))

//       const savedTheme = localStorage.getItem("theme") || "dark"
//       setTheme(savedTheme)
//       document.documentElement.classList.toggle("dark", savedTheme === "dark")
//     }
//   }, [])

//   useEffect(() => {
//     fetch(`https://api.alquran.cloud/v1/page/${page}/${edition}`)
//       .then(res => res.json())
//       .then(data => setAyahs(data.data.ayahs))
//       .catch(err => console.error(err))

//     if (typeof window !== "undefined") {
//       localStorage.setItem("lastPage", page)
//     }
//   }, [page])

//   useEffect(() => {
//     fetch(`https://api.alquran.cloud/v1/surah`)
//       .then(res => res.json())
//       .then(data => setSurahs(data.data))
//       .catch(err => console.error(err))
//   }, [])

//   const handleBookmark = (ayah) => {
//     const newBookmark = {
//       surah: ayah.surah.name,
//       surahNumber: ayah.surah.number,
//       ayah: ayah.numberInSurah,
//     }
//     setBookmark(newBookmark)
//     if (typeof window !== "undefined") {
//       localStorage.setItem("bookmark", JSON.stringify(newBookmark))
//     }
//   }

//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark"
//     setTheme(newTheme)
//     if (typeof window !== "undefined") {
//       localStorage.setItem("theme", newTheme)
//     }
//     document.documentElement.classList.toggle("dark", newTheme === "dark")
//   }

//   const prev = () => { if (page > 1) setPage(page - 1) }
//   const next = () => { if (page < totalPages) setPage(page + 1) }

//   return (
//     <div dir="rtl"
//       className={`min-h-screen flex flex-col font-arabic transition-colors duration-500
//       ${theme === "dark"
//         ? "bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200"
//         : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900"}`}>

//       {/* الهيدر */}
//       <div className={`flex justify-between items-center p-4 shadow-lg border-b transition-colors duration-500
//         ${theme === "dark"
//           ? "bg-gradient-to-r from-gray-900 to-gray-800 text-teal-400 border-gray-700"
//           : "bg-gradient-to-r from-emerald-100 to-teal-50 text-emerald-700 border-emerald-300"}`}>

//         <div className="flex flex-row items-center gap-3">
//           <button onClick={() => setMenuOpen(true)} className="hover:scale-110 transition">
//             <CiMenuBurger className="w-7 h-7" />
//           </button>
//           <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-wide">
//             <BookOpen className="w-6 h-6" />
//             المصحف الشريف
//           </h1>
//         </div>

//         <div className="flex items-center gap-4">
//           <span className="text-sm px-3 py-1 rounded-full shadow border">
//             صفحة {page} / {totalPages}
//           </span>

//           {/* زر التبديل */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full border hover:scale-110 transition"
//           >
//             {theme === "dark"
//               ? <Sun className="w-6 h-6 text-yellow-400" />
//               : <Moon className="w-6 h-6 text-indigo-600" />}
//           </button>
//         </div>
//       </div>

//       {/* القائمة */}
//       <SideMenu toggleTheme={toggleTheme} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setPage={setPage} edition={edition} theme={theme} />

//       {/* محتوى */}
//       <div className="flex-1 flex flex-col items-center py-6 px-4">
//         {ayahs.length > 0 && (
//           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
//             <div className={`flex flex-col md:flex-row items-center justify-center gap-4 px-8 py-3 rounded-full shadow-lg transition-colors duration-500
//               ${theme === "dark" ? "bg-gray-900/60 border border-teal-500/50" : "bg-emerald-50 border border-emerald-300"}`}>
              
//               {/* اسم السورة */}
//               <h2 className="text-2xl font-bold tracking-wider">
//                 {ayahs[0]?.surah?.name}
//               </h2>

//               {/* رقم الجزء + الحزب */}
//               <div className="flex gap-6 text-sm">
//                 <span>
//                   الجزء:{" "}
//                   <span className="font-bold">
//                     {Math.ceil(page / (604 / 30))}
//                   </span>
//                 </span>
//                 <span>
//                   الحزب:{" "}
//                   <span className="font-bold">
//                     {Math.ceil(page / (604 / 60))}
//                   </span>
//                 </span>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* عرض الآيات */}
//         <motion.div
//           key={page}
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className={`w-full max-w-3xl rounded-3xl shadow-2xl border p-8 leading-loose text-center text-3xl tracking-wide transition-colors duration-500
//             ${theme === "dark"
//               ? "bg-gray-900/80 backdrop-blur-xl border-gray-700/60 text-gray-100"
//               : "bg-white border-gray-300 text-gray-900"}`}
//         >
//          {ayahs.map((a) => {
//             const isBookmarked =
//                 bookmark &&
//                 bookmark.surahNumber === a.surah.number &&
//                 bookmark.ayah === a.numberInSurah;

//             return (
//                 <React.Fragment key={a.number}>
//                 {a.text}{" "}
//                 <span
//                     onClick={() => handleBookmark(a)}
//                     className={`mx-1 inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shadow-md cursor-pointer transition
//                     ${
//                         isBookmarked
//                         ? "bg-gradient-to-br from-green-500 to-green-400 text-black ring-2 ring-green-300 scale-110"
//                         : "bg-gradient-to-br from-amber-400 to-yellow-500 text-gray-900 hover:scale-105"
//                     }`}
//                 >
//                     {a.numberInSurah}
//                 </span>{" "}
//                 </React.Fragment>
//             );
//         })}

//         </motion.div>
//       </div>

//       {/* فوتر */}
//       <div className={`p-4 border-t shadow-inner transition-colors duration-500
//         ${theme === "dark"
//           ? "bg-gradient-to-r from-gray-900/95 to-gray-800/90 border-gray-700"
//           : "bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-300"}`}>
        
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-5xl mx-auto">
//           {/* السابق / التالي */}
//           <div className="flex gap-3">
//             <button onClick={prev} disabled={page === 1}
//               className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition disabled:opacity-40 dark:bg-gray-700 dark:hover:bg-gray-600 bg-emerald-200 hover:bg-emerald-300">
//               <ArrowRight className="w-5 h-5" /> السابق
//             </button>
//             <button onClick={next} disabled={page === totalPages}
//               className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-90 transition disabled:opacity-40">
//               التالي <ArrowLeft className="w-5 h-5" />
//             </button>
//           </div>

//           {/* الانتقال إلى صفحة */}
//           <div className="flex items-center gap-2">
//             <input type="number" min="1" max={totalPages} value={jumpPage}
//               onChange={(e) => setJumpPage(e.target.value)}
//               placeholder="رقم الصفحة"
//               className="w-32 px-3 py-2 rounded-lg border text-center focus:outline-none focus:ring-2 focus:ring-teal-500" />
//             <button
//               onClick={() => {
//                 if (jumpPage >= 1 && jumpPage <= totalPages) setPage(Number(jumpPage))
//               }}
//               className="px-4 py-2 rounded-xl bg-teal-500 text-gray-900 font-bold hover:bg-teal-400 transition">
//               اذهب
//             </button>
//           </div>
//         </div>

//         {/* شريط تقدم */}
//         <div className="w-full mt-4 h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500"
//             style={{ width: `${(page / totalPages) * 100}%` }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default dynamic(() => Promise.resolve(Mushaf), { ssr: false })


"use client"
import React, { useState } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, BookOpen, Sun, Moon } from "lucide-react"
import { CiMenuBurger } from "react-icons/ci"
import SideMenu from "@/app/Components/MenuQuran"
import { useQuran } from "@/app/Context/QuranContext"

function Mushaf() {
  const {
    totalPages, edition, page, ayahs, theme, bookmark,
    setPage, prev, next, toggleTheme, handleBookmark
  } = useQuran()

  const [menuOpen, setMenuOpen] = useState(false)
  const [jumpPage, setJumpPage] = useState("")

  return (
    <div dir="rtl"
      className={`min-h-screen flex flex-col font-arabic transition-colors duration-500
      ${theme === "dark"
        ? "bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200"
        : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900"}`}>

      {/* الهيدر */}
      <div className={`flex justify-between items-center p-4 shadow-lg border-b transition-colors duration-500
        ${theme === "dark"
          ? "bg-gradient-to-r from-gray-900 to-gray-800 text-teal-400 border-gray-700"
          : "bg-gradient-to-r from-emerald-100 to-teal-50 text-emerald-700 border-emerald-300"}`}>

        <div className="flex flex-row items-center gap-3">
          <button onClick={() => setMenuOpen(true)} className="hover:scale-110 transition">
            <CiMenuBurger className="w-7 h-7" />
          </button>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-wide">
            <BookOpen className="w-6 h-6" />
            المصحف الشريف
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm px-3 py-1 rounded-full shadow border">
            صفحة {page} / {totalPages}
          </span>
          <button onClick={toggleTheme} className="p-2 rounded-full border hover:scale-110 transition">
            {theme === "dark"
              ? <Sun className="w-6 h-6 text-yellow-400" />
              : <Moon className="w-6 h-6 text-indigo-600" />}
          </button>
        </div>
      </div>

      {/* القائمة */}
      <SideMenu toggleTheme={toggleTheme} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setPage={setPage} edition={edition} theme={theme} />

      {/* محتوى */}
      <div className="flex-1 flex flex-col items-center py-6 px-4">
        {ayahs.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className={`flex flex-col md:flex-row items-center justify-center gap-4 px-8 py-3 rounded-full shadow-lg transition-colors duration-500
              ${theme === "dark" ? "bg-gray-900/60 border border-teal-500/50" : "bg-emerald-50 border border-emerald-300"}`}>
              <h2 className="text-2xl font-bold tracking-wider">
                {ayahs[0]?.surah?.name}
              </h2>
              <div className="flex gap-6 text-sm">
                <span>الجزء: <span className="font-bold">{Math.ceil(page / (604 / 30))}</span></span>
                <span>الحزب: <span className="font-bold">{Math.ceil(page / (604 / 60))}</span></span>
              </div>
            </div>
          </motion.div>
        )}

        {/* عرض الآيات */}
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`w-full max-w-3xl rounded-3xl shadow-2xl border p-8 leading-loose text-center text-3xl tracking-wide transition-colors duration-500
            ${theme === "dark"
              ? "bg-gray-900/80 backdrop-blur-xl border-gray-700/60 text-gray-100"
              : "bg-white border-gray-300 text-gray-900"}`}
        >
          {ayahs.map((a) => {
            const isBookmarked = bookmark &&
              bookmark.surahNumber === a.surah.number &&
              bookmark.ayah === a.numberInSurah

            return (
              <React.Fragment key={a.number}>
                {a.text}{" "}
                <span
                  onClick={() => handleBookmark(a)}
                  className={`mx-1 inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shadow-md cursor-pointer transition
                    ${isBookmarked
                      ? "bg-gradient-to-br from-green-500 to-green-400 text-black ring-2 ring-green-300 scale-110"
                      : "bg-gradient-to-br from-amber-400 to-yellow-500 text-gray-900 hover:scale-105"}`}
                >
                  {a.numberInSurah}
                </span>{" "}
              </React.Fragment>
            )
          })}
        </motion.div>
      </div>

      {/* فوتر */}
      <div className={`p-4 border-t shadow-inner transition-colors duration-500
        ${theme === "dark"
          ? "bg-gradient-to-r from-gray-900/95 to-gray-800/90 border-gray-700"
          : "bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-300"}`}>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-5xl mx-auto">
          <div className="flex gap-3">
            <button onClick={prev} disabled={page === 1} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition disabled:opacity-40 dark:bg-gray-700 dark:hover:bg-gray-600 bg-emerald-200 hover:bg-emerald-300">
              <ArrowRight className="w-5 h-5" /> السابق
            </button>
            <button onClick={next} disabled={page === totalPages} className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-90 transition disabled:opacity-40">
              التالي <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input type="number" min="1" max={totalPages} value={jumpPage} onChange={(e) => setJumpPage(e.target.value)} placeholder="رقم الصفحة"
              className="w-32 px-3 py-2 rounded-lg border text-center focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <button onClick={() => { if (jumpPage >= 1 && jumpPage <= totalPages) setPage(Number(jumpPage)) }} className="px-4 py-2 rounded-xl bg-teal-500 text-gray-900 font-bold hover:bg-teal-400 transition">
              اذهب
            </button>
          </div>
        </div>

        <div className="w-full mt-4 h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500" style={{ width: `${(page / totalPages) * 100}%` }}></div>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Mushaf), { ssr: false })
