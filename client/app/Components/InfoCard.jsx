'use client'
import { Moon, Calendar } from "lucide-react"
import { motion } from 'framer-motion'

export function InfoCard({ info }) {
  if (!info?.date) {
    return (
      <div className="rounded-3xl border border-[#30363d] bg-gradient-to-br from-[#0d1117] to-[#161b22] p-6 min-h-[220px] grid place-items-center shadow-[0_0_20px_rgba(88,199,250,0.15)]">
        <p className="text-[#8b949e] animate-pulse">جارِ تحميل معلومات اليوم…</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative rounded-3xl border border-[#30363d] 
                 bg-gradient-to-br from-[#0d1117] to-[#161b22] 
                 p-6 overflow-hidden shadow-[0_0_25px_rgba(88,199,250,0.15)]"
    >
      {/* خلفية زخرفية خفيفة */}
      <div className="absolute inset-0 bg-[url('/patterns/islamic-bg.svg')] opacity-5" />

      <div className="relative grid gap-6">
        {/* التاريخ الميلادي */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-2xl bg-[#161b22]/60 border border-[#30363d] shadow-inner"
        >
          <div className="flex items-center gap-2 text-[#58c7fa]">
            <Calendar className="h-5 w-5" />
            <span className="text-sm">التاريخ الميلادي</span>
          </div>
          <p className="text-2xl font-bold mt-1">{info.date} — {info.day}</p>
        </motion.div>

        {/* التاريخ الهجري */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 rounded-2xl bg-[#161b22]/60 border border-[#30363d] shadow-inner"
        >
          <div className="flex items-center gap-2 text-[#58c7fa]">
            <Moon className="h-5 w-5" />
            <span className="text-sm">التاريخ الهجري</span>
          </div>
          <p className="text-xl font-semibold mt-1">{info.hijri} هـ — {info.hijriMonth}</p>
        </motion.div>

        {/* اقتباس / دعاء */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-[#8b949e] italic"
        >
          🌙 نسأل الله القبول والثبات
        </motion.div>
      </div>
    </motion.div>
  )
}
