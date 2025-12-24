"use client"
import { motion } from "framer-motion"
import { seerahEvents } from "@/utils/data"
import { Star, Sparkles, BookOpen, Heart, Feather, ChevronLeft } from "lucide-react"
import { SiteHeader } from "@/app/Components/SiteHeader"
import { SiteFooter } from "@/app/Components/SiteFooter"

export default function SeerahTimeline() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFCF0] pt-20">
      <SiteHeader />

      {/* Hero Header */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary-green" />
        <img
          src="/patterns/hero-bg.png"
          alt="Pattern"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-green via-primary-green/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-100 text-xs font-black tracking-widest uppercase"
          >
            <Sparkles size={14} className="text-gold-accent" />
            <span>نبي الرحمة والهدى ﷺ</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tight"
          >
            السيرة <span className="text-gold-accent">النبوية</span> العطرة
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-emerald-100/70 max-w-2xl mx-auto leading-relaxed"
          >
            رحلة النور والهدى من مولد الحبيب المصطفى ﷺ إلى الرفيق الأعلى، نستلهم منها الدروس والعبر لبناء حياة مطمئنة.
          </motion.p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-32">
        <div className="relative">
          {/* Main Timeline Line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-b from-primary-green via-emerald-100 to-transparent rounded-full md:block hidden" />

          <div className="space-y-32">
            {seerahEvents.map((event, index) => {
              const isEven = index % 2 === 0
              let Icon = Sparkles
              if (event.title.includes("مولد")) Icon = Star
              if (event.title.includes("وفاة")) Icon = Heart
              if (event.title.includes("وحي")) Icon = Feather

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex flex-col md:flex-row items-center gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 w-full order-2 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className={`p-8 md:p-12 rounded-[3.5rem] bg-white border border-emerald-50 shadow-2xl shadow-emerald-900/5 hover:shadow-emerald-900/10 transition-all group relative overflow-hidden ${!isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform" />

                      <div className={`relative z-10 flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} text-right`}>
                        <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-emerald-50 text-primary-green text-xs font-black tracking-widest uppercase">
                          <BookOpen size={14} className="text-gold-accent" />
                          {event.hijriDate || event.start}
                        </div>

                        <h3 className="text-3xl font-black text-slate-800 mb-6 group-hover:text-primary-green transition-colors">{event.title}</h3>

                        <div className="space-y-4 text-slate-500 font-medium leading-[1.8]">
                          {event.commentary.map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>

                        <div className="pt-8 flex items-center gap-2 text-primary-green font-black text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                          اقرأ المزيد <ChevronLeft size={16} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Marker */}
                  <div className="relative z-10 flex items-center justify-center shrink-0 order-1 md:order-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white border-2 border-primary-green flex items-center justify-center text-primary-green shadow-xl shadow-emerald-900/10 rotate-12 group-hover:rotate-0 transition-transform bg-cream-bg">
                      <Icon size={32} />
                    </div>
                  </div>

                  {/* Empty Spacer for Desktop */}
                  <div className="flex-1 hidden md:block order-3" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

