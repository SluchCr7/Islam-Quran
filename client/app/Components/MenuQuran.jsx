"use client"
import React, { useState, useEffect } from "react"
import {
  X, Search, ChevronDown, ChevronRight, Sun, Moon, Star, BookOpen, Clock, LayoutGrid, Heart
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function SideMenu({ toggleTheme, menuOpen, setMenuOpen, setPage, edition, theme }) {
  const [openSurahs, setOpenSurahs] = useState(false)
  const [openJuz, setOpenJuz] = useState(false)
  const [surahs, setSurahs] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favs = localStorage.getItem("favorites")
      if (favs) setFavorites(JSON.parse(favs))
    }

    const fetchSurahs = async () => {
      try {
        const res = await fetch("https://api.alquran.cloud/v1/surah")
        const data = await res.json()
        setSurahs(data.data)
      } catch (err) {
        console.error("Error fetching surahs:", err)
      }
    }
    fetchSurahs()
  }, [])

  const juzList = Array.from({ length: 30 }, (_, i) => ({
    number: i + 1,
    label: `الجزء ${i + 1}`,
  }))

  const goToPage = (page) => {
    setPage(page)
    setMenuOpen(false)
    if (typeof window !== 'undefined') {
      localStorage.setItem("lastPage", page)
    }
  }

  const fetchSurah = async (id, addToFav = false) => {
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/${edition}`)
      const data = await res.json()
      const firstPage = data.data.ayahs[0].page
      goToPage(firstPage)

      if (addToFav) {
        const fav = { type: "surah", id, name: data.data.name }
        const updatedFavs = [...favorites, fav]
        setFavorites(updatedFavs)
        localStorage.setItem("favorites", JSON.stringify(updatedFavs))
      }
    } catch (err) {
      console.error("Error fetching surah page:", err)
    }
  }

  const fetchJuz = async (juzNumber, addToFav = false) => {
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/${edition}`)
      const data = await res.json()
      const firstPage = data.data.ayahs[0].page
      goToPage(firstPage)

      if (addToFav) {
        const fav = { type: "juz", id: juzNumber, name: `الجزء ${juzNumber}` }
        const updatedFavs = [...favorites, fav]
        setFavorites(updatedFavs)
        localStorage.setItem("favorites", JSON.stringify(updatedFavs))
      }
    } catch (err) {
      console.error("Error fetching juz page:", err)
    }
  }

  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-emerald-50/50 border-b border-emerald-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-green flex items-center justify-center text-white shadow-lg shadow-emerald-900/10">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">فهرس المصحف</h2>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 bg-white rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
              {/* Search */}
              <div className="relative group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 transition-transform group-focus-within:scale-110" size={18} />
                <input
                  type="text"
                  placeholder="ابحث عن سورة، جزء، أو صفحة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-12 pr-12 pl-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:bg-white transition-all shadow-inner"
                />
              </div>

              {/* Favorites */}
              {favorites.length > 0 && (
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                    <Heart size={14} className="text-red-400" fill="currentColor" /> المفضلة
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {favorites.map((f, i) => (
                      <button
                        key={i}
                        onClick={() => f.type === "surah" ? fetchSurah(f.id) : fetchJuz(f.id)}
                        className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-black hover:bg-emerald-100 transition-all text-right whitespace-nowrap overflow-hidden"
                      >
                        <Star size={12} className="text-gold-accent shrink-0" fill="currentColor" />
                        <span className="truncate">{f.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sections */}
              <div className="space-y-4">
                {/* Surahs Section */}
                <div className="space-y-2">
                  <button
                    onClick={() => setOpenSurahs(!openSurahs)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-emerald-50 hover:bg-emerald-50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-primary-green group-hover:text-white transition-colors">
                        <LayoutGrid size={16} />
                      </div>
                      <span className="font-black text-slate-800">السور</span>
                    </div>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform ${openSurahs ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {openSurahs && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-emerald-50/30 rounded-2xl border border-emerald-50"
                      >
                        <div className="p-2 grid grid-cols-1 gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                          {surahs
                            .filter(s => s.name.includes(searchTerm))
                            .map((s) => (
                              <div key={s.number} className="flex items-center gap-1 group/item">
                                <button
                                  onClick={() => fetchSurah(s.number)}
                                  className="flex-1 flex justify-between items-center p-3 rounded-xl hover:bg-white transition-all text-sm font-bold text-slate-700 hover:text-primary-green text-right"
                                >
                                  <span>{s.number}. {s.name}</span>
                                  <span className="text-[10px] text-slate-300 group-hover/item:text-emerald-300">صفحة {s.number}</span>
                                </button>
                                <button
                                  onClick={() => fetchSurah(s.number, true)}
                                  className="p-3 text-slate-200 hover:text-gold-accent transition-colors"
                                >
                                  <Star size={16} />
                                </button>
                              </div>
                            ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Juz Section */}
                <div className="space-y-2">
                  <button
                    onClick={() => setOpenJuz(!openJuz)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-emerald-50 hover:bg-emerald-50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-primary-green group-hover:text-white transition-colors">
                        <LayoutGrid size={16} />
                      </div>
                      <span className="font-black text-slate-800">الأجزاء</span>
                    </div>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform ${openJuz ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {openJuz && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-emerald-50/30 rounded-2xl border border-emerald-50"
                      >
                        <div className="p-2 grid grid-cols-1 gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                          {juzList
                            .filter(j => j.label.includes(searchTerm))
                            .map((j) => (
                              <div key={j.number} className="flex items-center gap-1 group/item">
                                <button
                                  onClick={() => fetchJuz(j.number)}
                                  className="flex-1 flex justify-between items-center p-3 rounded-xl hover:bg-white transition-all text-sm font-bold text-slate-700 hover:text-primary-green text-right"
                                >
                                  <span>{j.label}</span>
                                </button>
                                <button
                                  onClick={() => fetchJuz(j.number, true)}
                                  className="p-3 text-slate-200 hover:text-gold-accent transition-colors"
                                >
                                  <Star size={16} />
                                </button>
                              </div>
                            ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quick Navigate */}
                <div className="p-6 bg-primary-green rounded-[2rem] text-white space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gold-accent" />
                    <h3 className="text-sm font-black uppercase tracking-widest">انتقال سريع</h3>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="رقم الصفحة..."
                      onKeyDown={(e) => e.key === "Enter" && goToPage(Number(e.target.value))}
                      className="w-full h-10 px-4 rounded-xl bg-white/10 border border-white/20 text-sm font-bold placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all text-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="p-6 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose">
                ﴿ تِلْكَ آيَاتُ الْكِتَابِ الْمُبِينِ ﴾
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

