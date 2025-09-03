"use client"
import { motion } from "framer-motion"
import { seerahEvents } from "@/utils/data"
import { Star, Sparkles, BookOpen, Heart, Feather } from "lucide-react"

export default function SeerahTimeline() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-green-50 via-white to-green-100 overflow-hidden">
      {/* خلفية زخرفية */}
      <div className="absolute inset-0 opacity-5 bg-[url('/islambg2.jpg')] bg-repeat"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* العنوان */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl font-extrabold text-green-800 mb-4 flex items-center justify-center gap-3">
              <Star className="text-yellow-500 w-10 h-10" />
              السيرة النبوية
              <Star className="text-yellow-500 w-10 h-10" />
            </h2>
            <p className="text-gray-600 text-xl">
              رحلة النور من مولد الحبيب ﷺ إلى لقاء الرفيق الأعلى
            </p>
          </motion.div>
        </div>

        {/* التايملاين */}
        <div className="relative">
          {/* الخط الرئيسي */}
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-green-600/30 rounded-full"></div>

          {seerahEvents.map((event, index) => {
            const isLeft = index % 2 === 0

            // اختيار أيقونة حسب نوع الحدث
            let Icon = Sparkles
            if (event.title.includes("مولد") || event.title.includes("Birth")) Icon = Star
            if (event.title.includes("وفاة") || event.title.includes("passed")) Icon = Heart
            if (event.title.includes("وحي") || event.title.includes("Gabriel")) Icon = Feather

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`mb-16 flex ${isLeft ? "justify-start" : "justify-end"} w-full`}
              >
                <div className="w-1/2 relative">
                  {/* أيقونة النقطة */}
                  <span className="absolute -top-3 -translate-y-1/2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-green-600 border-4 border-white shadow-lg flex items-center justify-center z-10">
                    <Icon className="w-5 h-5 text-yellow-300" />
                  </span>

                  {/* الكارد */}
                  <div className={`bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition ${isLeft ? "mr-10" : "ml-10"}`}>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">
                      {event.title}
                    </h3>
                    <div className="text-gray-700 leading-relaxed space-y-1">
                      {event.commentary.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>

                    {/* التاريخ */}
                    {(event.hijriDate || event.start) && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                        <BookOpen className="w-4 h-4 text-green-600" />
                        <span>{event.hijriDate || event.start}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
