"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../../Context/UserContext"
import UserProfileForm from "../../Components/UserProfileForm"
import { SiteHeader } from "@/app/Components/SiteHeader"
import { SiteFooter } from "@/app/Components/SiteFooter"
import {
  LogOut, User2, Mail, MapPin, BookOpen, Clock, UserCircle2,
  Star, Award, Activity, ShieldCircle, Heart
} from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFCF0] text-primary-green space-y-6">
        <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-primary-green animate-spin" />
        <p className="font-bold text-lg font-quran">جاري تحميل بياناتك...</p>
      </div>
    )
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFCF0] pt-20 flex flex-col">
      <SiteHeader />

      {/* Hero Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-primary-green" />
        <img
          src="/patterns/hero-bg.png"
          alt="Pattern"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-green via-primary-green/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-white/10 backdrop-blur-3xl rounded-full blur-2xl" />
              <img
                src={user?.user.profilePhoto?.url || "/default-avatar.png"}
                alt="Profile"
                className="w-40 h-40 md:w-56 md:h-56 relative z-10 rounded-[3rem] border-8 border-white/10 shadow-2xl object-cover"
              />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gold-accent rounded-2xl flex items-center justify-center text-primary-green shadow-xl z-20">
                <ShieldCircle size={24} />
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-right space-y-6">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-100 text-[10px] font-black tracking-widest uppercase"
                >
                  <Star size={12} className="text-gold-accent" />
                  عضو في عائلة نور الإسلام
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl">{user.user.Name}</h1>
                <p className="text-emerald-100/70 font-medium text-lg">{user.user.Email}</p>
              </div>

              <div className="p-6 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 inline-block">
                <p className="text-sm md:text-md text-emerald-50 italic font-medium leading-relaxed">
                  🌙 "اللهم اجعل عملنا كله صالحًا، واجعله لوجهك خالصًا."
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-white/20 transition-all hover:border-red-500/50 group"
            >
              <LogOut size={20} className="group-hover:text-red-500 transition-colors" />
              تسجيل الخروج
            </motion.button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto w-full px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[3rem] p-10 border border-emerald-50 shadow-2xl shadow-emerald-900/5 space-y-8">
              <h2 className="text-2xl font-black text-slate-800 border-r-4 border-gold-accent pr-6">بطاقة الهوية</h2>

              <div className="space-y-6">
                {[
                  { label: "الاسم الكامل", value: user.user.Name, icon: <User2 className="text-emerald-500" /> },
                  { label: "البريد الإلكتروني", value: user.user.Email, icon: <Mail className="text-emerald-500" /> },
                  { label: "الجنس", value: user.user.gender || "غير محدد", icon: <UserCircle2 className="text-emerald-500" /> },
                  { label: "الموقع", value: user.user.location || "غير محدد", icon: <MapPin className="text-emerald-500" /> },
                  { label: "القاريء المفضل", value: user.user.preferredReciter || "غير محدد", icon: <BookOpen className="text-emerald-500" /> },
                  { label: "آخر ظهور", value: user.user.lastLogin ? new Date(user.user.lastLogin).toLocaleDateString() : "غير متوفر", icon: <Clock className="text-emerald-500" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center transition-colors group-hover:bg-primary-green group-hover:text-white">
                      {React.cloneElement(item.icon, { size: 20 })}
                    </div>
                    <div className="flex-1 border-b border-emerald-50 pb-4 group-last:border-0">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="font-bold text-slate-700">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "الختمات", value: "2", icon: <Award className="text-gold-accent" /> },
                { label: "الأذكار", value: "124", icon: <Heart className="text-red-500" /> },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-emerald-50 shadow-xl shadow-emerald-900/5 flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50/50 flex items-center justify-center mb-2">
                    {stat.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-800 tracking-tighter">{stat.value}</span>
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">

            {/* Form Section */}
            <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-emerald-50 shadow-2xl shadow-emerald-900/5 border-t-8 border-t-primary-green">
              <div className="mb-12 space-y-2">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">تحديث الملف الشخصي</h2>
                <p className="text-slate-400 font-bold">قم بتخصيص تجربتك وتعديل تفضيلاتك في تطبيق نور الإسلام</p>
              </div>
              <UserProfileForm />
            </div>

            {/* Achievements & Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white rounded-[3rem] p-10 border border-emerald-50 shadow-2xl shadow-emerald-900/5">
                <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                  <Award size={20} className="text-gold-accent" />
                  الأوسمة
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["مصلي الفجر", "محب القرآن", "ذاكر الله كثيراً", "مبادر الخير"].map((badge, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-100 hover:bg-gold-accent hover:text-primary-green transition-colors cursor-default">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-10 border border-emerald-50 shadow-2xl shadow-emerald-900/5">
                <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                  <Activity size={20} className="text-primary-green" />
                  النشاط الأخير
                </h3>
                <div className="space-y-4">
                  {[
                    "أتممت وردك اليومي",
                    "استمعت للشيخ المنشاوي",
                    "تحديث موقع مواقيت الصلاة",
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-500 font-medium">
                      <div className="w-2 h-2 rounded-full bg-gold-accent" />
                      <p className="text-sm">{activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

