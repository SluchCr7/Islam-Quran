"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles, ChevronRight, Heart } from "lucide-react"

export default function SeerahWidgetPro() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative w-full h-full min-h-[300px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/10 cursor-pointer group"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/islambg.jpg"
          alt="Islamic Background"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-green via-primary-green/80 to-primary-green/20" />
      </div>

      {/* Decorative Patterns */}
      <div className="absolute inset-0 bg-[url('/patterns/subtle-pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-8 left-8"
      >
        <Sparkles className="text-gold-accent" size={24} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-6 shadow-xl text-gold-accent group-hover:scale-110 transition-transform">
          <Heart size={28} fill="currentColor" />
        </div>

        <h3 className="text-3xl font-black text-white mb-3 drop-shadow-md">
          السيرة النبوية
        </h3>

        <p className="text-emerald-100/80 text-sm font-medium mb-8 leading-relaxed max-w-[240px]">
          رحلة الهدى والنور من المولد الشريف ﷺ إلى الرفيق الأعلى
        </p>

        <Link
          href="/Pages/Mohamed"
          className="w-full py-4 bg-white text-primary-green font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:bg-gold-accent transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          <span>استكشف السيرة العطرة</span>
          <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  )
}

