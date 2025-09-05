'use client'
import { motion } from "framer-motion"
import { BookOpen, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] text-white relative overflow-hidden"
    >
      {/* خلفية زخرفية */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 flex items-center justify-center text-[200px] text-yellow-500/10 font-bold select-none"
      >
        404
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-lg p-6"
      >
        <BookOpen className="mx-auto mb-6 text-yellow-400" size={64} />

        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          عذراً! الصفحة غير موجودة
        </h1>

        <p className="text-gray-300 mb-6 leading-relaxed">
          {`﴿وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًۭا﴾`} <br />
          ربما ضللت الطريق، دعنا نعيدك إلى الصفحة الرئيسية.
        </p>

        <Link href="/" passHref>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold shadow-lg"
          >
            <Home size={20} /> العودة للرئيسية
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
