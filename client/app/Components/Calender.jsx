// 'use client'
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Calendar, ChevronLeft, ChevronRight, Star, Moon, Sun } from "lucide-react";

// // الشهور الهجرية
// const hijriMonths = [
//   "محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى",
//   "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
// ];

// // الأحداث الإسلامية (اليوم - الشهر)
// const islamicEvents = {
//   "1-1": { name: "رأس السنة الهجرية", icon: <Star className="w-4 h-4 text-pink-400" /> },
//   "10-1": { name: "عاشوراء", icon: <Star className="w-4 h-4 text-yellow-400" /> },
//   "27-7": { name: "الإسراء والمعراج", icon: <Moon className="w-4 h-4 text-indigo-400" /> },
//   "1-9": { name: "بداية رمضان", icon: <Moon className="w-4 h-4 text-emerald-400" /> },
//   "27-9": { name: "ليلة القدر (محتملة)", icon: <Star className="w-4 h-4 text-blue-400" /> },
//   "1-10": { name: "عيد الفطر", icon: <Sun className="w-4 h-4 text-green-500" /> },
//   "9-12": { name: "يوم عرفة", icon: <Sun className="w-4 h-4 text-orange-400" /> },
//   "10-12": { name: "عيد الأضحى", icon: <Moon className="w-4 h-4 text-green-400" /> },
// };

// const daysInMonth = 30; // للتبسيط

// export default function HijriCalendar() {
//   const [month, setMonth] = useState(8); // رمضان (index يبدأ من 0)
//   const [year, setYear] = useState(1447);
//   const [hoveredEvent, setHoveredEvent] = useState(null);

//   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

//   // التنقل بين الشهور
//   const changeMonth = (dir) => {
//     let newMonth = month + dir;
//     let newYear = year;
//     if (newMonth > 11) {
//       newMonth = 0;
//       newYear++;
//     } else if (newMonth < 0) {
//       newMonth = 11;
//       newYear--;
//     }
//     setMonth(newMonth);
//     setYear(newYear);
//   };

//   // استخراج المناسبات الخاصة بالشهر الحالي
//   const monthEvents = Object.entries(islamicEvents).filter(([key]) => {
//     const [d, m] = key.split("-");
//     return parseInt(m) === month + 1;
//   });

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl text-white w-full py-12"
//     >
//       {/* الهيدر */}
//       <div className="flex items-center justify-between mb-6">
//         <button onClick={() => changeMonth(-1)} className="p-2 rounded-lg hover:bg-slate-700 transition">
//           <ChevronRight className="w-5 h-5" />
//         </button>

//         <div className="flex flex-col items-center">
//           <h2 className="text-2xl font-bold flex items-center gap-2">
//             <Calendar className="w-6 h-6 text-emerald-400" />
//             {hijriMonths[month]} {year} هـ
//           </h2>
//           <span className="text-xs text-gray-400">التقويم الهجري</span>
//         </div>

//         <button onClick={() => changeMonth(1)} className="p-2 rounded-lg hover:bg-slate-700 transition">
//           <ChevronLeft className="w-5 h-5" />
//         </button>
//       </div>

//       {/* شبكة الأيام */}
//       <div className="grid grid-cols-7 gap-2 text-center mb-4">
//         {["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"].map((d, i) => (
//           <div key={i} className="text-sm font-semibold text-emerald-400">{d}</div>
//         ))}

//         {days.map((day) => {
//           const event = islamicEvents[`${day}-${month + 1}`] || null;
//           return (
//             <motion.div
//               key={day}
//               whileHover={{ scale: 1.08 }}
//               onMouseEnter={() => setHoveredEvent(event)}
//               onMouseLeave={() => setHoveredEvent(null)}
//               className={`relative flex items-center justify-center h-14 rounded-xl cursor-pointer border transition
//                 ${event
//                   ? "bg-gradient-to-br from-emerald-700 to-emerald-600 border-emerald-400 text-white font-bold shadow-lg"
//                   : "bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700"}`}
//             >
//               <span>{day}</span>
//               {event && <span className="absolute top-1 right-1">{event.icon}</span>}
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* التلميح عند التمرير */}
//       {hoveredEvent && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mt-2 p-3 rounded-xl bg-slate-700 border border-emerald-500 text-center text-sm"
//         >
//           📌 {hoveredEvent.name}
//         </motion.div>
//       )}

//       {/* قائمة المناسبات للشهر */}
//       {monthEvents.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-3 text-emerald-400 flex items-center gap-2">
//             <Star className="w-5 h-5 text-emerald-400" />
//             مناسبات هذا الشهر
//           </h3>
//           <ul className="space-y-2 text-sm">
//             {monthEvents.map(([key, event]) => {
//               const [d] = key.split("-");
//               return (
//                 <li
//                   key={key}
//                   className="flex items-center gap-2 bg-slate-800 p-3 rounded-lg border border-slate-700 hover:border-emerald-400 transition"
//                 >
//                   {event.icon}
//                   <span>{event.name} - {d} {hijriMonths[month]}</span>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}
//     </motion.div>
//   );
// }
'use client'
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Star, Moon, Sun } from "lucide-react";

// الشهور الهجرية
const hijriMonths = [
  "محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى",
  "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
];

// المناسبات الإسلامية
const islamicEvents = {
  "1-1": { name: "رأس السنة الهجرية", icon: <Star className="w-4 h-4 text-pink-400" /> },
  "10-1": { name: "عاشوراء", icon: <Star className="w-4 h-4 text-yellow-400" /> },
  "27-7": { name: "الإسراء والمعراج", icon: <Moon className="w-4 h-4 text-indigo-400" /> },
  "1-9": { name: "بداية رمضان", icon: <Moon className="w-4 h-4 text-emerald-400" /> },
  "27-9": { name: "ليلة القدر (محتملة)", icon: <Star className="w-4 h-4 text-blue-400" /> },
  "1-10": { name: "عيد الفطر", icon: <Sun className="w-4 h-4 text-green-500" /> },
  "9-12": { name: "يوم عرفة", icon: <Sun className="w-4 h-4 text-orange-400" /> },
  "10-12": { name: "عيد الأضحى", icon: <Moon className="w-4 h-4 text-green-400" /> },
};

const daysInMonth = 30;

export default function HijriCalendar() {
  const [month, setMonth] = useState(8); // رمضان
  const [year, setYear] = useState(1447);
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const days = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => i + 1), []);

  const changeMonth = (dir) => {
    let newMonth = month + dir;
    let newYear = year;
    if (newMonth > 11) { newMonth = 0; newYear++; }
    if (newMonth < 0) { newMonth = 11; newYear--; }
    setMonth(newMonth);
    setYear(newYear);
  };

  const monthEvents = Object.entries(islamicEvents).filter(([key]) => {
    const [d, m] = key.split("-");
    return parseInt(m) === month + 1;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* التقويم */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-2 relative p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl text-white overflow-hidden"
      >
        {/* زخرفة خلفية */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-10"></div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <button onClick={() => changeMonth(-1)} className="p-2 rounded-full bg-slate-800 hover:bg-emerald-600 transition">
            <ChevronRight className="w-5 h-5 text-yellow-400" />
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              {hijriMonths[month]} {year} هـ
            </h2>
            <span className="text-xs text-gray-400">التقويم الهجري</span>
          </div>
          <button onClick={() => changeMonth(1)} className="p-2 rounded-full bg-slate-800 hover:bg-emerald-600 transition">
            <ChevronLeft className="w-5 h-5 text-yellow-400" />
          </button>
        </div>

        {/* شبكة الأيام */}
        <div className="grid grid-cols-7 gap-2 text-center relative z-10">
          {["أحد","إثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"].map((d,i) => (
            <div key={i} className="text-sm font-semibold text-emerald-400">{d}</div>
          ))}

          {days.map(day => {
            const event = islamicEvents[`${day}-${month + 1}`];
            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.08 }}
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
                className={`relative flex items-center justify-center h-16 rounded-xl cursor-pointer border transition
                  ${event
                    ? "bg-gradient-to-br from-emerald-700 to-emerald-600 shadow-lg border-emerald-400 text-white font-bold"
                    : "bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700"}`}
              >
                <span>{day}</span>
                {event && <span className="absolute top-1 right-1">{event.icon}</span>}
              </motion.div>
            );
          })}
        </div>

        {/* Tooltip */}
        {hoveredEvent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 rounded-xl bg-slate-800 border border-emerald-500 text-center text-sm shadow-lg relative z-10"
          >
            📌 {hoveredEvent.name}
          </motion.div>
        )}
      </motion.div>

      {/* الأحداث */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-1 p-6 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-700 shadow-2xl text-white"
      >
        <h3 className="text-lg font-semibold mb-4 text-emerald-400 flex items-center gap-2">
          <Star className="w-5 h-5 text-emerald-400" /> مناسبات هذا الشهر
        </h3>
        <div className="space-y-3">
          {monthEvents.length > 0 ? (
            monthEvents.map(([key, event]) => {
              const [d] = key.split("-");
              return (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-3 p-4 bg-slate-900 rounded-xl border border-slate-700 hover:border-emerald-400 transition shadow-md"
                >
                  {event.icon}
                  <span>{event.name} - {d} {hijriMonths[month]}</span>
                </motion.div>
              );
            })
          ) : (
            <p className="text-gray-400 text-sm">لا توجد مناسبات هامة في هذا الشهر.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
