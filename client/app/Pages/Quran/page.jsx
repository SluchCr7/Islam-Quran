"use client"
import React, { useState } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, BookOpen, Sun, Moon, Menu, Search, Bookmark, Navigation } from "lucide-react"
import SideMenu from "@/app/Components/MenuQuran"
import { useQuran } from "@/app/Context/QuranContext"
import { SiteHeader } from "@/app/Components/SiteHeader"

function Mushaf() {
  const {
    totalPages, edition, page, ayahs, theme, bookmark,
    setPage, prev, next, toggleTheme, handleBookmark
  } = useQuran()

  const [menuOpen, setMenuOpen] = useState(false)
  const [jumpPage, setJumpPage] = useState("")

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFCF0] flex flex-col pt-20">
      <SiteHeader />

      {/* Index Menu */}
      <SideMenu
        toggleTheme={toggleTheme}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setPage={setPage}
        edition={edition}
        theme={theme}
      />

      <main className="flex-1 flex flex-col items-center py-12 px-4 max-w-7xl mx-auto w-full">
        {/* Page Header Info */}
        <AnimatePresence mode="wait">
          {ayahs.length > 0 && (
            <motion.div
              key={`header-${ayahs[0]?.surah?.number}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-4xl mb-12"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-[3rem] bg-white border border-emerald-50 shadow-2xl shadow-emerald-900/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />

                <div className="flex items-center gap-6 relative z-10">
                  <button
                    onClick={() => setMenuOpen(true)}
                    className="w-14 h-14 rounded-2xl bg-primary-green flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
                  >
                    <Menu size={24} />
                  </button>
                  <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{ayahs[0]?.surah?.name}</h2>
                    <div className="flex gap-4 mt-1">
                      <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">الجزء {Math.ceil(page / (604 / 30))}</span>
                      <span className="text-xs font-black text-gold-accent uppercase tracking-widest bg-white border border-gold-accent/20 px-3 py-1 rounded-full">الحزب {Math.ceil(page / (604 / 60))}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">الصفحة الحالية</span>
                    <span className="text-xl font-black text-slate-800 tracking-tighter">{page} <span className="text-slate-300">/ {totalPages}</span></span>
                  </div>
                  <div className="w-px h-10 bg-slate-100 mx-2" />
                  <button onClick={toggleTheme} className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary-green transition-colors">
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mushaf Page */}
        <motion.div
          key={page}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white rounded-[4rem] shadow-2xl shadow-emerald-900/10 border border-emerald-50 p-12 md:p-20 relative min-h-[800px] flex flex-col"
        >
          {/* Decorative frame elements */}
          <div className="absolute inset-8 border border-emerald-100/50 rounded-[3rem] pointer-events-none" />
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-gold-accent/20 to-transparent" />

          <div className="flex-1 quran-page-content font-quran text-4xl leading-[2.8] text-slate-800 text-justify">
            {ayahs.map((a) => {
              const isBookmarked = bookmark &&
                bookmark.surahNumber === a.surah.number &&
                bookmark.ayah === a.numberInSurah

              return (
                <React.Fragment key={a.number}>
                  <span className="hover:text-primary-green transition-colors duration-300 cursor-default">
                    {a.text}{" "}
                    <motion.span
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleBookmark(a)}
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-base font-bold shadow-sm cursor-pointer transition-all duration-300 mx-1 border-2
                        ${isBookmarked
                          ? "bg-primary-green text-white border-primary-green ring-4 ring-emerald-100"
                          : "bg-white text-gold-accent border-gold-accent/20 hover:border-gold-accent"}`}
                    >
                      {a.numberInSurah}
                    </motion.span>{" "}
                  </span>
                </React.Fragment>
              )
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-50 flex justify-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">صدق الله العظيم</p>
          </div>
        </motion.div>
      </main>

      {/* Persistent Navigation Controls */}
      <div className="fixed bottom-8 inset-x-0 z-40 pointer-events-none">
        <div className="max-w-xl mx-auto px-4 pointer-events-auto">
          <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] border border-emerald-50 shadow-2xl p-4 flex items-center justify-between gap-4">
            <button
              onClick={prev}
              disabled={page === 1}
              className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary-green hover:bg-emerald-50 transition-all disabled:opacity-20"
            >
              <ArrowRight size={24} />
            </button>

            <div className="flex-1 flex items-center gap-2 px-4">
              <div className="relative flex-1 group">
                <Navigation className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 transition-transform group-focus-within:scale-110" size={16} />
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={jumpPage}
                  onChange={(e) => setJumpPage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && jumpPage >= 1 && jumpPage <= totalPages) {
                      setPage(Number(jumpPage));
                      setJumpPage("");
                    }
                  }}
                  placeholder="انتقل لصفحة..."
                  className="w-full h-12 pr-12 pl-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-sm font-black text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:bg-white transition-all shadow-inner text-center"
                />
              </div>
            </div>

            <button
              onClick={next}
              disabled={page === totalPages}
              className="h-14 w-14 rounded-2xl bg-primary-green flex items-center justify-center text-white shadow-lg hover:bg-emerald-800 hover:-translate-x-1 transition-all disabled:opacity-20 shadow-emerald-900/20"
            >
              <ArrowLeft size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-1.5 w-full bg-slate-200/30 rounded-full overflow-hidden backdrop-blur-md">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(page / totalPages) * 100}%` }}
              className="h-full bg-gradient-to-l from-primary-green to-emerald-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Mushaf), { ssr: false })

