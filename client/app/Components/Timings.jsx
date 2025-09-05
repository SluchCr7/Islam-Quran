import { motion } from 'framer-motion'
import { Sun } from 'lucide-react'

export function PrayerCardsGrid({ todayList, nextKey, PRAYER_META, PRAYER_BG }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {todayList.map((p, i) => {
        const meta = PRAYER_META[p.key]
        const Icon = meta?.Icon || Sun
        const isNext = p.key === nextKey

        return (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            className={`
              relative overflow-hidden rounded-3xl p-8 shadow-xl backdrop-blur-2xl 
              border ${isNext ? 'border-transparent ring-2 ring-offset-2 ring-offset-black ring-gradient-to-r from-emerald-400 to-yellow-400 animate-pulse' : 'border-white/10'} 
              bg-white/5
            `}
          >
            {/* الخلفية */}
            <motion.img
              src={PRAYER_BG[p.key] || '/images/cards/generic.jpg'}
              alt="bg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

            {/* المحتوى */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-3">
              <motion.div
                animate={isNext ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Icon
                  className={`mx-auto h-10 w-10 ${
                    isNext
                      ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]'
                      : 'text-yellow-400 drop-shadow-md'
                  }`}
                />
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
