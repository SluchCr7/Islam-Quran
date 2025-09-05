"use client"
import React from "react"
import { motion } from "framer-motion"
import { useAuth } from "../../Context/UserContext"
import UserProfileForm from "../../Components/UserProfileForm"
import { 
  LogOut, User2, Mail, MapPin, BookOpen, Clock, UserCircle2, 
  Star, Award, Activity 
} from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-white">
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-white font-sans"
    >
      {/* Header */}
      <div className="relative bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-10 text-center shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-[url('/islambg.jpg')] opacity-10 mix-blend-overlay" />
        <motion.img
          src={user?.user.profilePhoto?.url || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full border-4 border-yellow-400 shadow-xl backdrop-blur-md"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <h1 className="mt-4 text-3xl font-extrabold text-yellow-300 drop-shadow-lg">
          {user.user.Name}
        </h1>
        <p className="text-gray-200">{user.user.Email}</p>
        <p className="text-sm mt-3 italic">
          🌙 مرحباً بك يا {user.user.Name}، نسأل الله أن يبارك في وقتك
        </p>
      </div>

      {/* Profile Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* User Info */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1 bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/10 space-y-5"
        >
          <h2 className="text-2xl font-bold text-yellow-400 border-b border-yellow-400/30 pb-3">
            معلومات الحساب
          </h2>
          <div className="space-y-3 text-gray-200">
            <p className="flex items-center gap-2"><User2 className="w-5 h-5 text-yellow-400" /> {user.user.Name}</p>
            <p className="flex items-center gap-2"><Mail className="w-5 h-5 text-yellow-400" /> {user.user.Email}</p>
            <p className="flex items-center gap-2"><UserCircle2 className="w-5 h-5 text-yellow-400" /> {user.user.gender || "غير محدد"}</p>
            <p className="flex items-center gap-2"><MapPin className="w-5 h-5 text-yellow-400" /> {user.user.location || "غير محدد"}</p>
            <p className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-yellow-400" /> {user.user.preferredReciter || "غير محدد"}</p>
            <p className="flex items-center gap-2"><Clock className="w-5 h-5 text-yellow-400" /> {user.user.lastLogin ? new Date(user.user.lastLogin).toLocaleString() : "غير متوفر"}</p>
          </div>

          <button
            onClick={logout}
            className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-5 py-2.5 rounded-xl font-bold transition-all shadow-md"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-10">
          {/* Update Form */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10"
          >
            <h2 className="text-2xl font-bold text-yellow-400 mb-6 border-b border-yellow-400/30 pb-3">
              تعديل البيانات
            </h2>
            <UserProfileForm />
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { label: "عدد مرات الدخول", value: 24, icon: <Clock className="w-6 h-6" /> },
              { label: "السور المستمعة", value: 15, icon: <BookOpen className="w-6 h-6" /> },
              { label: "الأدعية المحفوظة", value: 8, icon: <Star className="w-6 h-6" /> },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 shadow-md flex flex-col items-center justify-center gap-3 border border-white/10">
                <div className="text-yellow-400">{stat.icon}</div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/10"
          >
            <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" /> الشارات
            </h2>
            <div className="flex flex-wrap gap-4">
              <span className="bg-emerald-600/80 px-4 py-2 rounded-full text-sm font-bold">🕌 محافظ على الصلاة</span>
              <span className="bg-blue-600/80 px-4 py-2 rounded-full text-sm font-bold">📖 استمع لـ 10 سور</span>
              <span className="bg-purple-600/80 px-4 py-2 rounded-full text-sm font-bold">🌙 وِرد يومي ثابت</span>
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/10"
          >
            <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" /> النشاطات الأخيرة
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li>✅ سجل دخول اليوم الساعة 3:45م</li>
              <li>🎧 استمع لسورة الكهف</li>
              <li>⭐ أضاف دعاء جديد للمفضلة</li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
