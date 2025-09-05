'use client'
import { Moon, Calendar, Copy } from "lucide-react"
import { motion } from 'framer-motion'

export function InfoCard({ info }) {
  if (!info?.date) {
    return (
      <div className="rounded-3xl border border-[#30363d] bg-gradient-to-br from-[#0d1117] to-[#161b22] p-6 min-h-[220px] grid place-items-center shadow-[0_0_25px_rgba(88,199,250,0.15)]">
        <p className="text-[#8b949e] animate-pulse">جارِ تحميل معلومات اليوم…</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative rounded-3xl border border-[#30363d] 
                 bg-gradient-to-br from-[#0d1117] to-[#161b22] 
                 p-6 overflow-hidden shadow-[0_0_30px_rgba(88,199,250,0.2)] 
                 hover:shadow-[0_0_40px_rgba(88,199,250,0.3)] transition-shadow"
    >
      {/* خلفية زخرفية متحركة */}
      <motion.div
        className="absolute inset-0 bg-[url('/patterns/islamic-bg.svg')] opacity-5"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />

      <div className="relative grid gap-6">
        {/* التاريخ الميلادي */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -2 }}
          className="p-4 rounded-2xl bg-[#161b22]/60 border border-[#30363d] shadow-inner"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#58c7fa]">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">التاريخ الميلادي</span>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(info.date)}
              className="p-1 rounded hover:bg-[#58c7fa]/10"
            >
              <Copy className="w-4 h-4 text-[#8b949e] hover:text-[#58c7fa]" />
            </button>
          </div>
          <p className="text-2xl font-bold mt-1">{info.date} — {info.day}</p>
        </motion.div>

        {/* Divider زخرفي */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#58c7fa]/40 to-transparent" />

        {/* التاريخ الهجري */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -2 }}
          className="p-4 rounded-2xl bg-[#161b22]/60 border border-[#30363d] shadow-inner"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#58c7fa]">
              <Moon className="h-5 w-5" />
              <span className="text-sm">التاريخ الهجري</span>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(info.hijri)}
              className="p-1 rounded hover:bg-[#58c7fa]/10"
            >
              <Copy className="w-4 h-4 text-[#8b949e] hover:text-[#58c7fa]" />
            </button>
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
