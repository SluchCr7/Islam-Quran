'use client'
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const HadithContext = createContext()

export const HadithProvider = ({ children }) => {
  const [hadiths, setHadiths] = useState([])
  const [hadithToday, setHadithToday] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showEnglish, setShowEnglish] = useState(false)

  // 🔹 جلب الأحاديث
  const fetchHadiths = useCallback(async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/hadiths/all`)
      const list = res.data.hadiths?.data || []
      setHadiths(list)

      if (list.length > 0) {
        pickRandomHadith(list)
      }
      setError(null)
    } catch (err) {
      console.error("❌ Error fetching hadiths:", err)
      setError("تعذر تحميل الأحاديث.")
      // fallback من localStorage
      const last = localStorage.getItem("lastHadith")
      if (last) {
        setHadithToday(JSON.parse(last))
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // 🔹 اختيار حديث عشوائي
  const pickRandomHadith = useCallback((list = hadiths) => {
    if (!list || list.length === 0) return
    setLoading(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * list.length)
      const chosen = list[randomIndex]
      setHadithToday(chosen)
      localStorage.setItem("lastHadith", JSON.stringify(chosen))
      setLoading(false)
    }, 400)
  }, [hadiths])

  // 🔹 نسخ الحديث
  const copyHadith = useCallback(() => {
    if (!hadithToday) return
    const text = showEnglish ? hadithToday.hadithEnglish : hadithToday.hadithArabic
    navigator.clipboard.writeText(text)
    alert("تم نسخ الحديث ✅")
  }, [hadithToday, showEnglish])

  // 🔹 مشاركة الحديث
  const shareHadith = useCallback(() => {
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
  }, [hadithToday, showEnglish])

  useEffect(() => {
    fetchHadiths()
  }, [fetchHadiths])

  return (
    <HadithContext.Provider
      value={{
        hadiths,
        hadithToday,
        loading,
        error,
        showEnglish,
        setShowEnglish,
        fetchHadiths,
        pickRandomHadith,
        copyHadith,
        shareHadith,
      }}
    >
      {children}
    </HadithContext.Provider>
  )
}

export const useHadith = () => useContext(HadithContext)
