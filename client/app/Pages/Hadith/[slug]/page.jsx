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

  // Debounce البحث لتحسين الأداء
  const [searchTerm, setSearchTerm] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    async function fetchHadiths() {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:3001/api/hadiths/${slug}`)
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

  if (loading) return <div className="p-6 text-center text-lg text-yellow-400">جاري التحميل...</div>

  const highlight = (text) => {
    if (!searchTerm) return text
    const regex = new RegExp(`(${searchTerm})`, "gi")
    return text.split(regex).map((part, i) => 
      regex.test(part) ? <span key={i} className="bg-yellow-400/50 rounded">{part}</span> : part
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* العنوان الرئيسي */}
      <h1 className="text-4xl font-extrabold text-center text-yellow-400 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500">
        {slug === "bukhary" ? "صحيح البخاري" : slug === "muslim" ? "صحيح مسلم" : "سنن الترمذي"}
      </h1>

      {/* البحث */}
      <div className="flex items-center mb-8 max-w-md mx-auto bg-gray-800 rounded-lg p-2 shadow-md sticky top-4 z-10">
        <Search className="w-5 h-5 mr-2 text-yellow-400" />
        <input
          type="text"
          placeholder="ابحث في الأحاديث..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          className="w-full p-2 bg-gray-900/70 text-white placeholder-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* قائمة الفصول */}
      <div className="space-y-6">
        {chapters.map(ch => (
          <div key={ch.chapterNumber} className="rounded-3xl overflow-hidden shadow-xl border border-gray-700">
            <button
              className="w-full flex justify-between items-center bg-gradient-to-r from-yellow-500 to-amber-600 p-4 text-white font-bold text-lg hover:from-yellow-400 hover:to-amber-500 transition-colors"
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
                className="p-6 space-y-6 bg-gray-900/50 backdrop-blur-md"
              >
                {ch.hadiths.map(h => (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gray-800/70 hover:bg-gray-800/90 transition-colors rounded-2xl p-6 shadow-xl space-y-3 border-l-4 border-yellow-400 relative"
                  >
                    <h2 className="text-xl font-bold text-yellow-300">{highlight(h.headingArabic)}</h2>
                    <p className="text-right text-gray-100 text-lg leading-relaxed">{highlight(h.hadithArabic)}</p>
                    <p className="text-left text-gray-300 text-base leading-relaxed">{highlight(h.hadithEnglish)}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      الراوي: <span className="text-yellow-300">{h.englishNarrator || h.urduNarrator}</span> — 📚 {h.book?.bookName}
                    </p>

                    {/* Bookmark & Share */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button className="p-1 rounded-full hover:bg-yellow-500/20"><Bookmark className="w-5 h-5 text-yellow-400" /></button>
                      <button className="p-1 rounded-full hover:bg-yellow-500/20"><Share2 className="w-5 h-5 text-yellow-400" /></button>
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
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-5 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="inline w-5 h-5 mr-1" /> السابق
        </button>
        <span className="text-yellow-300 font-bold text-lg">{page} / {totalPages}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-5 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          التالي <ArrowRight className="inline w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  )
}
