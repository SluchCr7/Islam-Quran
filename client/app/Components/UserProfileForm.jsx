"use client"
import React, { useState } from "react"
import { useAuth } from "../Context/UserContext"
import { motion } from "framer-motion"
import { User, MapPin, Music, UserCircle, Save, Loader2 } from "lucide-react"

export default function UserProfileForm() {
  const { user, setUser, updateUser } = useAuth()
  const [formData, setFormData] = useState({
    Name: user?.Name || "",
    gender: user?.gender || "",
    preferredReciter: user?.preferredReciter || "",
    location: user?.location || "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      const res = await updateUser(user._id, formData)
      setUser(res.user)
      setMessage("✅ تم تحديث الملف الشخصي بنجاح")
    } catch (err) {
      setMessage("❌ حدث خطأ أثناء التحديث")
    } finally {
      setLoading(false)
    }
  }

  const inputClasses = "w-full h-12 px-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:bg-white transition-all shadow-inner"
  const labelClasses = "flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2 pr-2"

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="w-full bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 border border-emerald-50 space-y-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />

      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-green flex items-center justify-center text-white shadow-lg">
            <UserCircle size={20} />
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">تعديل الملف الشخصي</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Name */}
        <div className="space-y-2">
          <label className={labelClasses}><User size={14} className="text-emerald-500" /> الاسم بالكامل</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            placeholder="أدخل اسمك..."
            className={inputClasses}
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className={labelClasses}><UserCircle size={14} className="text-emerald-500" /> الجنس</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">اختر الجنس</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>

        {/* Preferred Reciter */}
        <div className="space-y-2">
          <label className={labelClasses}><Music size={14} className="text-emerald-500" /> القارئ المفضل</label>
          <select
            name="preferredReciter"
            value={formData.preferredReciter}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="">اختر قارئاً</option>
            <option value="minshawi">المنشاوي</option>
            <option value="afasy">مشاري العفاسي</option>
            <option value="husary">الحصري</option>
          </select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className={labelClasses}><MapPin size={14} className="text-emerald-500" /> الموقع</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="المدينة، الدولة..."
            className={inputClasses}
          />
        </div>
      </div>

      <div className="pt-4 relative z-10">
        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-primary-green hover:bg-emerald-800 text-white rounded-2xl font-black shadow-lg shadow-emerald-900/10 transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <Save size={20} className="group-hover:scale-110 transition-transform" />
              <span>حفظ التغييرات</span>
            </>
          )}
        </button>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-6 text-sm font-bold text-emerald-600 bg-emerald-50 py-3 rounded-xl border border-emerald-100"
          >
            {message}
          </motion.p>
        )}
      </div>
    </motion.form>
  )
}

