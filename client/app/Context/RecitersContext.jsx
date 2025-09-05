'use client'
import React, { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

// إنشاء الـ Context
const ReciterContext = createContext()

// الـ Provider
export const ReciterProvider = ({ children }) => {
  const [reciters, setReciters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_URL = "/api/reciters"  // عدل حسب الباك اند عندك

  // جلب جميع القراء
  const fetchReciters = async () => {
    try {
      setLoading(true)
      const res = await axios.get(API_URL)
      setReciters(res.data)
      setError(null)
    } catch (err) {
      setError("فشل في جلب القراء")
    } finally {
      setLoading(false)
    }
  }

  // جلب قارئ واحد
  const getReciter = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`)
      return res.data
    } catch {
      setError("فشل في جلب بيانات القارئ")
    }
  }

  // إضافة قارئ
  const addReciter = async (data) => {
    try {
      const res = await axios.post(API_URL, data)
      setReciters([...reciters, res.data])
    } catch {
      setError("فشل في إضافة القارئ")
    }
  }

  // تحديث قارئ
  const updateReciter = async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data)
      setReciters(reciters.map(r => (r._id === id ? res.data : r)))
    } catch {
      setError("فشل في تحديث بيانات القارئ")
    }
  }

  // حذف قارئ
  const deleteReciter = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setReciters(reciters.filter(r => r._id !== id))
    } catch {
      setError("فشل في حذف القارئ")
    }
  }

  // تحميل القراء أول مرة
  useEffect(() => {
    fetchReciters()
  }, [])

  return (
    <ReciterContext.Provider
      value={{
        reciters,
        loading,
        error,
        fetchReciters,
        getReciter,
        addReciter,
        updateReciter,
        deleteReciter
      }}
    >
      {children}
    </ReciterContext.Provider>
  )
}

// هوك للاستخدام في أي مكان
export const useReciters = () => useContext(ReciterContext)
