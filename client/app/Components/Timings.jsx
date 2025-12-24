import { motion } from 'framer-motion'
import { Sun, Sunrise, Sunset, Moon, CloudSun } from 'lucide-react'

export function PrayerCardsGrid({ todayList, nextKey, PRAYER_META, PRAYER_BG }) {
  const getIcon = (key) => {
    switch (key) {
      case 'Fajr': return Sunrise
      case 'Dhuhr': return CloudSun
      case 'Asr': return Sun
      case 'Maghrib': return Sunset
      case 'Isha': return Moon
      default: return Sun
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {todayList.map((p, i) => {
        const meta = PRAYER_META[p.key]
        const Icon = getIcon(p.key)
        const isNext = p.key === nextKey

        return (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -10 }}
            className={`relative group rounded-[2.5rem] p-8 overflow-hidden transition-all duration-500 ${isNext
                ? 'bg-primary-green text-white shadow-2xl shadow-emerald-900/20'
                : 'bg-white border border-emerald-50 text-slate-800 shadow-xl shadow-slate-200/50'
              }`}
          >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl -mr-12 -mt-12 transition-colors duration-500 ${isNext ? 'bg-gold-accent/20' : 'bg-emerald-50'
              }`} />

            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 transform group-hover:rotate-12 ${isNext
                  ? 'bg-white/10 text-gold-accent backdrop-blur-md'
                  : 'bg-emerald-50 text-emerald-600'
                }`}>
                <Icon size={32} strokeWidth={1.5} />
              </div>

              {/* Title & Time */}
              <div className="space-y-1">
                <p className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isNext ? 'text-emerald-200' : 'text-slate-400'
                  }`}>
                  صلاة {meta.ar}
                </p>
                <p className={`text-4xl font-mono font-black ${isNext ? 'text-white' : 'text-primary-green'
                  }`}>
                  {p.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {/* Status Badge */}
              {isNext && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-1.5 rounded-full bg-gold-accent text-primary-green text-[10px] font-black uppercase tracking-widest shadow-lg shadow-black/10"
                >
                  موعدنا الآن
                </motion.div>
              )}
            </div>

            {/* Subtle Pattern */}
            <div className={`absolute inset-0 opacity-[0.03] pointer-events-none transition-opacity ${isNext ? 'mix-blend-overlay' : ''
              }`}>
              <img src="/patterns/subtle-pattern.png" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

