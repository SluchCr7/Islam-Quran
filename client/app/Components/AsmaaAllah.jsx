"use client"
import { motion } from "framer-motion"
import { AsmaulHusnaNames } from "../../utils/data"

const names = AsmaulHusnaNames

export default function AsmaulHusnaMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-t border-[#30363d]/60 bg-gradient-to-r from-[#0d1117] via-[#161b22] to-[#0d1117] py-6">
      {/* خلفية زخرفية شفافة */}
      <div className="absolute inset-0 bg-[url('/islambg.jpg')] opacity-5 pointer-events-none" />

      {/* الماركيه - لاين واحد */}
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      >
        {/* نكرر الأسماء 4 مرات لضمان انسيابية */}
        {[...names, ...names, ...names, ...names].map((name, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.15 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500
                       text-xl font-extrabold drop-shadow-[0_0_12px_rgba(255,215,0,0.6)] tracking-wide px-6 transition-all"
          >
            {name}
            <span className="mx-4 text-yellow-400 opacity-60">✦</span>
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
