'use client'
import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react";

const hijriMonths = [
  "محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى",
  "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
];

const islamicEvents = {
  "1-1": { name: "رأس السنة الهجرية", icon: <Star size={14} className="text-amber-400" /> },
  "10-1": { name: "عاشوراء", icon: <Star size={14} className="text-amber-400" /> },
  "27-7": { name: "الإسراء والمعراج", icon: <Star size={14} className="text-amber-400" /> },
  "12-3": { name: "المولد النبوي الشريف", icon: <Star size={14} className="text-amber-400" /> },
  "15-8": { name: "ليلة النصف من شعبان", icon: <Star size={14} className="text-amber-400" /> },
  "1-9": { name: "بداية رمضان", icon: <Sparkles size={14} className="text-emerald-500" /> },
  "17-9": { name: "غزوة بدر الكبرى", icon: <Star size={14} className="text-red-400" /> },
  "20-9": { name: "فتح مكة", icon: <Star size={14} className="text-teal-400" /> },
  "27-9": { name: "ليلة القدر (محتملة)", icon: <Sparkles size={14} className="text-gold-accent" /> },
  "1-10": { name: "عيد الفطر", icon: <Sparkles size={14} className="text-emerald-500" /> },
  "8-12": { name: "يوم التروية", icon: <Star size={14} className="text-cyan-400" /> },
  "9-12": { name: "يوم عرفة", icon: <Star size={14} className="text-amber-400" /> },
  "10-12": { name: "عيد الأضحى", icon: <Sparkles size={14} className="text-emerald-500" /> },
};

const daysInMonth = 30;
const days = [...Array(daysInMonth).keys()].map(i => i + 1);

const DayCell = React.memo(function DayCell({ day, event }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative flex items-center justify-center aspect-square rounded-2xl cursor-pointer border transition-all duration-300
        ${event
          ? "bg-primary-green text-white border-primary-green shadow-lg shadow-emerald-900/10 font-black"
          : "bg-white border-emerald-50 text-slate-800 hover:bg-emerald-50"}`}
    >
      <span className="text-sm">{day}</span>
      {event && <span className="absolute top-1 right-1">{event.icon}</span>}
    </motion.div>
  );
});

const EventCard = React.memo(function EventCard({ event, day, monthName }) {
  return (
    <motion.div
      whileHover={{ x: -10 }}
      className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-primary-green group-hover:text-white transition-colors">
        {event.icon}
      </div>
      <div>
        <p className="text-slate-800 font-bold text-sm">{event.name}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{day} {monthName}</p>
      </div>
    </motion.div>
  );
});

export default function HijriCalendar() {
  const [month, setMonth] = useState(8);
  const [year, setYear] = useState(1446);

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

  const monthEvents = useMemo(() => {
    return Object.entries(islamicEvents).filter(([key]) => {
      const [, m] = key.split("-");
      return parseInt(m) === month + 1;
    });
  }, [month]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-green flex items-center justify-center text-white shadow-lg shadow-emerald-900/10">
              <Calendar size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">{hijriMonths[month]} {year} هـ</h2>
              <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">التقويم الهجري</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => changeMonth(-1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-emerald-50 text-emerald-600 hover:bg-emerald-50 shadow-sm transition-all">
              <ChevronRight size={20} />
            </button>
            <button onClick={() => changeMonth(1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-emerald-50 text-emerald-600 hover:bg-emerald-50 shadow-sm transition-all">
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-3 sm:gap-4 md:gap-6">
          {["ح", "ن", "ث", "ر", "خ", "ج", "س"].map(d => (
            <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest pb-2">{d}</div>
          ))}
          {days.map((day) => {
            const event = islamicEvents[`${day}-${month + 1}`];
            return (
              <DayCell
                key={day}
                day={day}
                event={event}
              />
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="text-gold-accent" size={20} />
          <h3 className="text-xl font-black text-slate-800">مناسبات الشهر</h3>
        </div>
        <div className="space-y-4">
          {monthEvents.length > 0 ? (
            monthEvents.map(([key, event]) => {
              const [d] = key.split("-");
              return <EventCard key={key} event={event} day={d} monthName={hijriMonths[month]} />;
            })
          ) : (
            <div className="p-8 rounded-[2rem] bg-emerald-50/50 border border-dashed border-emerald-200 text-center">
              <p className="text-slate-400 text-sm font-medium">لا توجد أحداث هامة هذا الشهر.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

