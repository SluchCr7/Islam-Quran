"use client"
import React, { useState, useEffect } from "react"
import {
  X, Search, ChevronDown, ChevronRight, Sun, Moon, Star, BookOpen, Clock
} from "lucide-react"

export default function SideMenu({ toggleTheme, menuOpen, setMenuOpen, setPage, edition, theme }) {
  const [openSurahs, setOpenSurahs] = useState(false)
  const [openJuz, setOpenJuz] = useState(false)
  const [surahs, setSurahs] = useState([])
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || [])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {

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
    localStorage.setItem("lastPage", page)
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
    <div className={`fixed top-0 right-0 h-full w-80 shadow-xl transform transition-transform duration-300 z-50
        ${menuOpen ? "translate-x-0" : "translate-x-full"}
        ${theme === "dark" ? "bg-[#111827] text-gray-200" : "bg-white text-gray-900 border-l border-gray-300"}`}>

      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold flex items-center gap-2"><BookOpen /> القائمة</h2>
        <button onClick={() => setMenuOpen(false)}>
          <X className="w-6 h-6 text-gray-400 hover:text-red-500 transition" />
        </button>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className={`flex items-center rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
          <Search className="w-5 h-5 ml-2 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث بالصفحة أو السورة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Favorites */}
      <div className="px-4 py-2 border-b border-gray-700">
        <h3 className="flex items-center gap-2 font-semibold mb-2"><Star className="w-5 h-5 text-yellow-400" /> المفضلة</h3>
        {favorites.length > 0 ? (
          <ul className="space-y-1">
            {favorites.map((f, i) => (
              <li key={i} className="hover:bg-gray-800 p-2 rounded-lg cursor-pointer text-sm"
                onClick={() => f.type === "surah" ? fetchSurah(f.id) : fetchJuz(f.id)}>
                {f.name}
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-gray-400">لا توجد مفضلات بعد</p>}
      </div>

      {/* Surahs */}
      <div className="px-4 py-2 border-b border-gray-700">
        <button className="flex justify-between w-full items-center p-2 rounded-lg hover:bg-gray-800"
          onClick={() => setOpenSurahs(!openSurahs)}>
          <span>السور</span>
          {openSurahs ? <ChevronDown /> : <ChevronRight />}
        </button>
        {openSurahs && (
          <ul className="mt-2 max-h-48 overflow-y-auto space-y-1">
            {surahs
              .filter(s => s.name.includes(searchTerm) || s.englishName.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((s) => (
              <li key={s.number}
                className="flex justify-between items-center hover:bg-gray-800 p-2 rounded-lg cursor-pointer text-sm">
                <span onClick={() => fetchSurah(s.number)}>{s.name} ({s.englishName})</span>
                <button onClick={() => fetchSurah(s.number, true)}><Star className="w-4 h-4 text-yellow-400" /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Juz */}
      <div className="px-4 py-2 border-b border-gray-700">
        <button className="flex justify-between w-full items-center p-2 rounded-lg hover:bg-gray-800"
          onClick={() => setOpenJuz(!openJuz)}>
          <span>الأجزاء</span>
          {openJuz ? <ChevronDown /> : <ChevronRight />}
        </button>
        {openJuz && (
          <ul className="mt-2 max-h-48 overflow-y-auto space-y-1">
            {juzList
              .filter(j => j.label.includes(searchTerm))
              .map((j) => (
              <li key={j.number}
                className="flex justify-between items-center hover:bg-gray-800 p-2 rounded-lg cursor-pointer text-sm">
                <span onClick={() => fetchJuz(j.number)}>{j.label}</span>
                <button onClick={() => fetchJuz(j.number, true)}><Star className="w-4 h-4 text-yellow-400" /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Navigation */}
      <div className="px-4 py-2 border-b border-gray-700">
        <h3 className="flex items-center gap-2 mb-2 font-semibold"><Clock className="w-5 h-5 text-blue-400" /> الانتقال السريع</h3>
        <div className="flex gap-2">
          <input type="number" placeholder="رقم الصفحة" className="flex-1 p-2 rounded bg-gray-700 text-white text-sm"
            onKeyDown={(e) => e.key === "Enter" && goToPage(Number(e.target.value))} />
        </div>
      </div>

      {/* Theme Switch */}
      <div className="border-t border-gray-400 py-4">
        <div className="flex items-center justify-between px-4 cursor-pointer" onClick={toggleTheme}>
          <span className="flex items-center gap-2">
            تغير الثيم {theme === "dark" ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-indigo-600" />}
          </span>
        </div>
      </div>
    </div>
  )
}
