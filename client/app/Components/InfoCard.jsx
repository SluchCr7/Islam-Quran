'use client'
import { Moon, Calendar, Copy, MapPin } from "lucide-react"
import { motion } from 'framer-motion'

export function InfoCard({ info }) {
  if (!info?.date) {
    return (
      <div className="rounded-[2rem] border border-emerald-100 bg-white/50 backdrop-blur-md p-8 min-h-[220px] grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-500 animate-spin" />
          <p className="text-slate-400 font-medium">جاري استحضار البيانات...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-[2rem] border border-emerald-100 bg-white/80 backdrop-blur-xl p-8 overflow-hidden shadow-xl shadow-emerald-900/5 group"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('/patterns/subtle-pattern.png')] opacity-10" />

      <div className="relative space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">اليوم المبارك</h3>
            <p className="text-sm text-emerald-600 font-semibold tracking-wide flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              موقعك الحالي مفعّل
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:rotate-6 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* التاريخ الميلادي */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 relative overflow-hidden group/item">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">التاريخ الميلادي</span>
              <button onClick={() => navigator.clipboard.writeText(info.date)} className="opacity-0 group-hover/item:opacity-100 transition-opacity">
                <Copy className="w-3.5 h-3.5 text-emerald-400 hover:text-emerald-600" />
              </button>
            </div>
            <p className="text-xl font-bold text-slate-800">{info.date}</p>
            <p className="text-sm text-slate-500 font-medium mt-1">{info.day}</p>
          </div>

          {/* التاريخ الهجري */}
          <div className="p-5 rounded-2xl bg-primary-green text-white relative overflow-hidden group/item shadow-lg shadow-emerald-900/10">
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8" />
            <div className="flex items-center justify-between mb-3 relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-emerald-200 font-bold">التاريخ الهجري</span>
              <button onClick={() => navigator.clipboard.writeText(info.hijri)} className="text-white/50 hover:text-white transition-colors">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xl font-bold relative z-10">{info.hijri} هـ</p>
            <p className="text-sm text-emerald-100 font-medium mt-1 relative z-10">{info.hijriMonth}</p>
          </div>
        </div>

        {/* Quote Footer */}
        <div className="pt-6 border-t border-emerald-50 flex items-center justify-center">
          <p className="text-sm text-slate-400 italic text-center leading-relaxed">
            "اللهم اجعل يومنا هذا خيرًا من أمسنا، وغدنا خيرًا من يومنا"
          </p>
        </div>
      </div>
    </motion.div>
  )
}

