'use client'
import { useEffect, useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Search, ArrowLeft, ArrowRight, Bookmark, Share2 } from "lucide-react"

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
      h.hadithEnglish.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  const highlight = (text) => {
    if (!searchTerm) return text
    const regex = new RegExp(`(${searchTerm})`, "gi")
    return text.split(regex).map((part, i) => 
      regex.test(part) ? <span key={i} className="bg-yellow-400/40 px-1 rounded">{part}</span> : part
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl shadow-lg bg-gradient-to-r from-amber-600 to-yellow-500 p-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          {slug === "bukhary" ? "صحيح البخاري" : slug === "muslim" ? "صحيح مسلم" : "سنن الترمذي"}
        </h1>
        <p className="mt-2 text-yellow-100 text-lg">📖 مجموعة من الأحاديث النبوية الصحيحة</p>
      </div>

      {/* Search */}
      <div className="flex items-center max-w-lg mx-auto bg-gray-900/70 rounded-full px-4 py-2 shadow-lg backdrop-blur-md sticky top-6 z-20">
        <Search className="w-5 h-5 mr-2 text-yellow-400" />
        <input
          type="text"
          placeholder="ابحث في الأحاديث..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          className="w-full bg-transparent text-white placeholder-yellow-200 focus:outline-none"
        />
      </div>

      {/* Chapters */}
      <div className="space-y-6">
        {chapters.map(ch => (
          <div key={ch.chapterNumber} className="rounded-3xl overflow-hidden shadow-xl border border-gray-700">
            <button
              className="w-full flex justify-between items-center bg-gradient-to-r from-yellow-600 to-amber-500 px-6 py-4 text-white font-bold text-lg hover:from-yellow-500 hover:to-amber-400 transition-all"
              onClick={() => setOpenChapter(openChapter === ch.chapterNumber ? null : ch.chapterNumber)}
            >
              <span>{ch.chapterArabic}</span>
              {openChapter === ch.chapterNumber ? <ChevronUp /> : <ChevronDown />}
            </button>

            <AnimatePresence>
              {openChapter === ch.chapterNumber && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 space-y-6 bg-gray-900/60 backdrop-blur-lg"
                >
                  {ch.hadiths.map(h => (
                    <motion.div
                      key={h.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="relative bg-gray-800/70 hover:bg-gray-800/90 transition-colors rounded-2xl p-6 shadow-xl space-y-3 border border-yellow-500/40"
                    >
                      <h2 className="text-xl font-bold text-yellow-300">{highlight(h.headingArabic)}</h2>
                      <p className="text-right text-gray-100 text-lg leading-relaxed">{highlight(h.hadithArabic)}</p>
                      <p className="text-left text-gray-300 text-base leading-relaxed">{highlight(h.hadithEnglish)}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        الراوي: <span className="text-yellow-300">{h.englishNarrator || h.urduNarrator}</span> — 📚 {h.book?.bookName}
                      </p>

                      {/* Actions */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button className="p-2 rounded-full bg-gray-700/60 hover:bg-yellow-500/20 transition">
                          <Bookmark className="w-5 h-5 text-yellow-400" />
                        </button>
                        <button className="p-2 rounded-full bg-gray-700/60 hover:bg-yellow-500/20 transition">
                          <Share2 className="w-5 h-5 text-yellow-400" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition disabled:opacity-40 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> السابق
        </button>
        <span className="text-yellow-300 font-bold text-lg px-4 py-2 bg-gray-800 rounded-full">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition disabled:opacity-40 flex items-center gap-2"
        >
          التالي <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
