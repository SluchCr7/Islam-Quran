import { motion } from 'framer-motion'
import { Sun } from 'lucide-react'

export function PrayerCardsGrid({ todayList, nextKey , PRAYER_META , PRAYER_BG }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {todayList.map((p) => {
        const meta = PRAYER_META[p.key]
        const Icon = meta?.Icon || Sun
        const isNext = p.key === nextKey

        return (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className={`relative overflow-hidden rounded-3xl border border-gray-700 p-8 shadow-lg backdrop-blur-xl bg-black/60 
              ${isNext ? 'ring-2 ring-gradient-to-r from-emerald-400 to-yellow-400 shadow-xl animate-pulse' : ''}
            `}
          >
            {/* الخلفية */}
            <motion.div
              className="absolute inset-0 opacity-20 transition-transform duration-500 hover:scale-105"
            >
              <img
                src={PRAYER_BG[p.key] || '/images/cards/generic.jpg'}
                alt="bg"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* المحتوى */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-3">
              <motion.div
                animate={isNext ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Icon className={`mx-auto h-10 w-10 ${isNext ? 'text-emerald-400' : 'text-yellow-400'}`} />
              </motion.div>

              <h3 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-emerald-400 drop-shadow-lg">
                {meta.ar}
              </h3>

              <p className="text-2xl md:text-3xl font-mono text-gray-100 drop-shadow-md">
                {p.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
