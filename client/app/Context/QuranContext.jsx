"use client"
import React, { createContext, useContext, useEffect, useState } from "react"

const QuranContext = createContext()

export const QuranProvider = ({ children }) => {
  const totalPages = 604
  const edition = "quran-uthmani"

  const [page, setPage] = useState(1)
  const [ayahs, setAyahs] = useState([])
  const [surahs, setSurahs] = useState([])
  const [theme, setTheme] = useState("dark")
  const [bookmark, setBookmark] = useState(null)

  // ✅ تحميل البيانات من localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = JSON.parse(localStorage.getItem("bookmark"))
      if (saved) setBookmark(saved)

      const last = localStorage.getItem("lastPage")
      if (last) setPage(Number(last))

      const savedTheme = localStorage.getItem("theme") || "dark"
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }
  }, [])

  // ✅ جلب الآيات حسب الصفحة
  useEffect(() => {
    fetch(`https://api.alquran.cloud/v1/page/${page}/${edition}`)
      .then(res => res.json())
      .then(data => setAyahs(data.data.ayahs))
      .catch(err => console.error(err))

    if (typeof window !== "undefined") {
      localStorage.setItem("lastPage", page)
    }
  }, [page])

  // ✅ جلب السور مرة واحدة
  useEffect(() => {
    fetch(`https://api.alquran.cloud/v1/surah`)
      .then(res => res.json())
      .then(data => setSurahs(data.data))
      .catch(err => console.error(err))
  }, [])

  // ✅ الحفظ على Bookmark
  const handleBookmark = (ayah) => {
    const newBookmark = {
      surah: ayah.surah.name,
      surahNumber: ayah.surah.number,
      ayah: ayah.numberInSurah,
    }
    setBookmark(newBookmark)
    if (typeof window !== "undefined") {
      localStorage.setItem("bookmark", JSON.stringify(newBookmark))
    }
  }

  // ✅ تبديل الثيم
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme)
    }
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  // ✅ السابق / التالي
  const prev = () => { if (page > 1) setPage(page - 1) }
  const next = () => { if (page < totalPages) setPage(page + 1) }

  return (
    <QuranContext.Provider value={{
      totalPages, edition, page, ayahs, surahs, theme, bookmark,
      setPage, prev, next, toggleTheme, handleBookmark
    }}>
      {children}
    </QuranContext.Provider>
  )
}

export const useQuran = () => useContext(QuranContext)
