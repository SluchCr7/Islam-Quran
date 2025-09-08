'use client'
import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Star } from "lucide-react";

// 📌 الشهور الهجرية
const hijriMonths = [
  "محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى",
  "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
];

// 📌 المناسبات الإسلامية (موسعة)
const islamicEvents = {
  // محرم
  "1-1": { name: "رأس السنة الهجرية", icon: <Star className="w-4 h-4 text-pink-400" /> },
  "10-1": { name: "عاشوراء", icon: <Star className="w-4 h-4 text-yellow-400" /> },

  // رجب
  "27-7": { name: "الإسراء والمعراج", icon: <Star className="w-4 h-4 text-indigo-400" /> },

  // ربيع الأول
  "12-3": { name: "المولد النبوي الشريف", icon: <Star className="w-4 h-4 text-orange-400" /> },

  // شعبان
  "15-8": { name: "ليلة النصف من شعبان", icon: <Star className="w-4 h-4 text-purple-400" /> },

  // رمضان
  "1-9": { name: "بداية رمضان", icon: <Star className="w-4 h-4 text-emerald-400" /> },
  "17-9": { name: "غزوة بدر الكبرى", icon: <Star className="w-4 h-4 text-red-400" /> },
  "20-9": { name: "فتح مكة", icon: <Star className="w-4 h-4 text-teal-400" /> },
  "27-9": { name: "ليلة القدر (محتملة)", icon: <Star className="w-4 h-4 text-blue-400" /> },

  // شوال
  "1-10": { name: "عيد الفطر", icon: <Star className="w-4 h-4 text-green-500" /> },

  // ذو الحجة
  "8-12": { name: "يوم التروية", icon: <Star className="w-4 h-4 text-cyan-400" /> },
  "9-12": { name: "يوم عرفة", icon: <Star className="w-4 h-4 text-orange-400" /> },
  "10-12": { name: "عيد الأضحى", icon: <Star className="w-4 h-4 text-green-400" /> },
};

// 📌 الثوابت
const daysInMonth = 30;
const days = [...Array(daysInMonth).keys()].map(i => i + 1);

// ==========================
// 📌 DayCell Component
// ==========================
const DayCell = React.memo(function DayCell({ day, event, onHover }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      onMouseEnter={() => onHover(event)}
      onMouseLeave={() => onHover(null)}
      className={`relative flex items-center justify-center h-16 rounded-xl cursor-pointer border transition
        ${event
          ? "bg-gradient-to-br from-emerald-700 to-emerald-600 shadow-lg border-emerald-400 text-white font-bold"
          : "bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700"}`}
    >
      <span>{day}</span>
      {event && <span className="absolute top-1 right-1">{event.icon}</span>}
    </motion.div>
  );
});

// ==========================
// 📌 EventCard Component
// ==========================
const EventCard = React.memo(function EventCard({ event, day, monthName }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="flex items-center gap-3 p-4 bg-slate-900 rounded-xl border border-slate-700 hover:border-emerald-400 transition shadow-md"
    >
      {event.icon}
      <span>{event.name} - {day} {monthName}</span>
    </motion.div>
  );
});

// ==========================
// 📌 Main Calendar Component
// ==========================
export default function HijriCalendar() {
  const [month, setMonth] = useState(3); // رمضان
  const [year, setYear] = useState(1447);
  const [hoveredEvent, setHoveredEvent] = useState(null);

  // 📌 تغيير الشهر
  const changeMonth = useCallback((dir) => {
    setMonth((prev) => {
      let newMonth = prev + dir;
      let newYear = year;
      if (newMonth > 11) { newMonth = 0; newYear++; }
      if (newMonth < 0) { newMonth = 11; newYear--; }
      setYear(newYear);
      return newMonth;
    });
  }, [year]);

  // 📌 أحداث الشهر الحالي
  const monthEvents = useMemo(() => {
    return Object.entries(islamicEvents).filter(([key]) => {
      const [, m] = key.split("-");
      return parseInt(m) === month + 1;
    });
  }, [month]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 📅 التقويم */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => changeMonth(-1)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold">{hijriMonths[month]} {year} هـ</h2>
          <button onClick={() => changeMonth(1)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const event = islamicEvents[`${day}-${month + 1}`];
            return (
              <DayCell
                key={day}
                day={day}
                event={event}
                onHover={setHoveredEvent}
              />
            );
          })}
        </div>
      </motion.div>

      {/* 🕌 قائمة الأحداث */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" /> الأحداث الهامة
        </h2>
        <div className="space-y-3">
          {monthEvents.length > 0 ? (
            monthEvents.map(([key, event]) => {
              const [d] = key.split("-");
              return <EventCard key={key} event={event} day={d} monthName={hijriMonths[month]} />;
            })
          ) : (
            <p className="text-gray-400">لا توجد أحداث هامة هذا الشهر.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
