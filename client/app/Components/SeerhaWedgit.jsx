"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function SeerahWidgetPro() {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
    >
      {/* الخلفية مع تأثير حركة بسيطة */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/mosque.jpg')" }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 20 }}
      ></motion.div>

      {/* Overlay داكن */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40"></div>

      {/* نجوم متحركة */}
      <motion.div
        className="absolute top-6 left-6 w-2 h-2 bg-yellow-400 rounded-full"
        animate={{ y: [0, 5, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      <motion.div
        className="absolute top-16 right-12 w-3 h-3 bg-yellow-300 rounded-full"
        animate={{ y: [0, -4, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />

      {/* الهلال الزخرفي */}
      <motion.div
        className="absolute top-4 right-4 text-yellow-400 text-2xl"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        🌙
      </motion.div>

      {/* محتوى النصوص */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
          السيرة النبوية
        </h3>
        <p className="text-white/80 text-sm md:text-lg mb-6 drop-shadow-md">
          رحلة النور من المولد الشريف ﷺ إلى الرفيق الأعلى
        </p>

        {/* زر CTA */}
        <Link
          href="/Pages/Mohamed"
          className="relative px-6 py-3 bg-yellow-400 text-green-900 font-bold rounded-full shadow-lg 
                     hover:bg-yellow-300 hover:shadow-2xl transition duration-300"
        >
          استكشف السيرة
        </Link>
      </div>
    </motion.div>
  )
}
