'use client'
import { useEffect, useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Search, ArrowLeft, ArrowRight, Bookmark, Share2, Sparkles, BookOpen } from "lucide-react"
import { SiteHeader } from "@/app/Components/SiteHeader"
import { SiteFooter } from "@/app/Components/SiteFooter"

export default function HadithBookPage() {
  const { slug } = useParams()
  const [hadiths, setHadiths] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [openChapter, setOpenChapter] = useState(null)
  const [page, setPage] = useState(1)
  const pageSize = 20

  // Debounce
  const [searchTerm, setSearchTerm] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    async function fetchHadiths() {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/api/hadiths/${slug}`)
        const data = await res.json()
        setHadiths(data.hadiths?.data || [])
      } catch (error) {
        console.error("Failed to fetch hadiths:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHadiths()
  }, [slug])

  const filteredHadiths = useMemo(() => {
    if (!searchTerm) return hadiths
    return hadiths.filter(h =>
      h.hadithArabic.includes(searchTerm) ||
      h.hadithEnglish?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [hadiths, searchTerm])

  const totalPages = Math.ceil(filteredHadiths.length / pageSize)
  const currentHadiths = useMemo(() => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return filteredHadiths.slice(start, end)
  }, [filteredHadiths, page])

  const chapters = useMemo(() => {
    const grouped = {}
    currentHadiths.forEach(h => {
      const chId = h.chapter.chapterNumber
      if (!grouped[chId]) grouped[chId] = { ...h.chapter, hadiths: [] }
      grouped[chId].hadiths.push(h)
    })
    return Object.values(grouped)
  }, [currentHadiths])

  if (loading) return (
    <div className="min-h-screen bg-[#FDFCF0] flex flex-col pt-20">
      <SiteHeader />
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
        <div className="w-20 h-20 rounded-full border-4 border-emerald-100 border-t-primary-green animate-spin" />
        <h2 className="text-xl font-black text-primary-green font-quran">جاري تحميل كنوز السنة...</h2>
      </div>
    </div>
  )

  const highlight = (text) => {
    if (!text || !searchTerm) return text
    const regex = new RegExp(`(${searchTerm})`, "gi")
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <span key={i} className="bg-gold-accent/40 px-1 rounded font-black">{part}</span> : part
    )
  }

  const bookTitles = {
    bukhary: "صحيح البخاري",
    muslim: "صحيح مسلم",
    tirmidhi: "سنن الترمذي",
    hisn: "حصن المسلم"
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFCF0] pt-20 flex flex-col">
      <SiteHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-16 space-y-16">
        {/* Page Banner */}
        <div className="relative overflow-hidden rounded-[4rem] bg-primary-green p-12 md:p-20 text-center shadow-2xl shadow-emerald-900/10">
          <img
            src="/patterns/hero-bg.png"
            alt="Pattern"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-green via-primary-green/40 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex flex-col items-center space-y-6"
          >
            <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-gold-accent shadow-2xl">
              <BookOpen size={40} />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl">
                {bookTitles[slug] || "كتب الحديث"}
              </h1>
              <p className="mt-4 text-emerald-100/70 text-lg font-bold">
                📖 مجموعة من الأحاديث النبوية الصحيحة والموثقة
              </p>
            </div>
          </motion.div>
        </div>

        {/* Sticky Search & Info */}
        <div className="sticky top-24 z-30 max-w-2xl mx-auto px-4 w-full">
          <div className="bg-white/80 backdrop-blur-2xl border border-emerald-50 rounded-[2.5rem] shadow-2xl p-4 flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full group">
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-primary-green transition-transform group-focus-within:scale-110" size={20} />
              <input
                type="text"
                placeholder="ابحث في متن الحديث أو الموضوع..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                className="w-full h-14 pr-14 pl-6 rounded-[1.5rem] bg-emerald-50/50 border border-emerald-100 text-sm font-black text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all shadow-inner"
              />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-slate-400 bg-slate-50 px-6 py-4 rounded-[1.5rem] border border-slate-100 whitespace-nowrap">
              <Sparkles size={14} className="text-gold-accent" />
              إجمالي النتائج: {filteredHadiths.length}
            </div>
          </div>
        </div>

        {/* Chapters & Hadiths */}
        <div className="space-y-10">
          {chapters.map((ch, idx) => (
            <motion.div
              key={ch.chapterNumber}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-900/5 border border-emerald-50 bg-white transition-all duration-500 ${openChapter === ch.chapterNumber ? 'ring-4 ring-gold-accent/10' : ''}`}>
                <button
                  className={`w-full flex justify-between items-center px-10 py-8 text-right transition-colors ${openChapter === ch.chapterNumber ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}
                  onClick={() => setOpenChapter(openChapter === ch.chapterNumber ? null : ch.chapterNumber)}
                >
                  <div className="flex items-center gap-6">
                    <span className="w-12 h-12 rounded-2xl bg-primary-green flex items-center justify-center text-white font-black text-sm shadow-lg">
                      {ch.chapterNumber}
                    </span>
                    <span className="text-2xl font-black text-slate-800 tracking-tight">{ch.chapterArabic}</span>
                  </div>
                  <div className={`transition-transform duration-500 ${openChapter === ch.chapterNumber ? 'rotate-180 text-gold-accent' : 'text-slate-300'}`}>
                    <ChevronDown size={28} />
                  </div>
                </button>

                <AnimatePresence>
                  {openChapter === ch.chapterNumber && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-emerald-50/50"
                    >
                      <div className="p-10 space-y-12">
                        {ch.hadiths.map((h, hIdx) => (
                          <motion.div
                            key={h.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: hIdx * 0.1 }}
                            className="relative bg-[#FDFCF0] rounded-[2.5rem] p-10 shadow-xl border border-emerald-50/50 group/item hover:translate-x-4 transition-transform duration-500"
                          >
                            {/* Decorative frame */}
                            <div className="absolute inset-4 border border-emerald-100/30 rounded-[2rem] pointer-events-none" />

                            <div className="flex flex-col gap-8 relative z-10">
                              <div className="flex items-start justify-between">
                                <h2 className="text-xl font-black text-primary-green font-quran pl-12 leading-relaxed tracking-wide">
                                  {highlight(h.headingArabic)}
                                </h2>
                                <div className="flex gap-2">
                                  <button className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-300 hover:text-gold-accent hover:shadow-lg transition-all border border-emerald-50">
                                    <Bookmark size={20} />
                                  </button>
                                  <button className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-300 hover:text-primary-green hover:shadow-lg transition-all border border-emerald-50">
                                    <Share2 size={20} />
                                  </button>
                                </div>
                              </div>

                              <blockquote className="text-3xl font-quran text-slate-800 leading-[2] text-justify">
                                {highlight(h.hadithArabic)}
                              </blockquote>

                              <p className="text-lg font-medium text-slate-500 leading-relaxed italic border-r-4 border-gold-accent pr-6">
                                {highlight(h.hadithEnglish)}
                              </p>

                              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-emerald-50/30">
                                <div className="px-4 py-2 rounded-xl bg-emerald-50 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                  الراوي: {h.englishNarrator || "غير معروف"}
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-gold-accent/10 text-[10px] font-black text-gold-accent uppercase tracking-widest">
                                  المصدر: {h.book?.bookName}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-20 pb-20">
            <button
              onClick={() => { setPage(prev => Math.max(prev - 1, 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={page === 1}
              className="h-16 px-8 rounded-[2rem] bg-white border border-emerald-50 text-slate-400 hover:text-primary-green hover:bg-emerald-50 transition-all shadow-xl shadow-emerald-900/5 disabled:opacity-20 flex items-center gap-3 font-black text-sm"
            >
              <ArrowRight size={20} /> السابق
            </button>

            <div className="h-16 px-8 rounded-[2rem] bg-gold-accent text-primary-green font-black flex items-center shadow-xl shadow-gold-accent/20">
              {page} <span className="mx-2 text-primary-green/40">/</span> {totalPages}
            </div>

            <button
              onClick={() => { setPage(prev => Math.min(prev + 1, totalPages)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={page === totalPages}
              className="h-16 px-8 rounded-[2rem] bg-primary-green text-white hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/20 disabled:opacity-20 flex items-center gap-3 font-black text-sm"
            >
              التالي <ArrowLeft size={20} />
            </button>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

