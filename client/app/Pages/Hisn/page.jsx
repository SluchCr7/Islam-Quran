"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hisnData from "../../../utils/hisn_almuslim.json";
import { Search, ArrowUp, Copy, BookOpen, ChevronRight, Sparkles, Heart } from "lucide-react";
import { SiteHeader } from "@/app/Components/SiteHeader";
import { SiteFooter } from "@/app/Components/SiteFooter";

export default function HisnMuslimPage() {
  const [activeSection, setActiveSection] = useState(Object.keys(hisnData)[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredSections = Object.entries(hisnData).filter(([title, section]) => {
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.text.some((line) =>
        line.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <div dir="rtl" className="min-h-screen bg-[#FDFCF0] pt-20 flex flex-col">
      <SiteHeader />

      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Sidebar */}
        <aside className="md:w-80 w-full bg-white border-l border-emerald-50 h-[calc(100vh-80px)] sticky top-20 flex flex-col z-20 shadow-2xl shadow-emerald-900/5">
          <div className="p-8 space-y-6">
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-green flex items-center justify-center text-white shadow-lg">
                <BookOpen size={24} />
              </div>
              حصن المسلم
            </h1>

            <div className="relative group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-green transition-transform group-focus-within:scale-110" size={18} />
              <input
                type="text"
                placeholder="ابحث عن ذكر..."
                className="w-full h-12 pr-12 pl-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-sm font-black text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-2 custom-scrollbar">
            {filteredSections.map(([title], idx) => (
              <button
                key={idx}
                className={`w-full text-right px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between group ${activeSection === title
                    ? "bg-primary-green text-white shadow-xl shadow-emerald-900/20 translate-x-1"
                    : "hover:bg-emerald-50 text-slate-600 font-bold"
                  }`}
                onClick={() => {
                  setActiveSection(title);
                  if (window.innerWidth < 768) {
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }
                }}
              >
                <span className="text-sm truncate">{title}</span>
                <ChevronRight size={16} className={`transition-transform ${activeSection === title ? 'rotate-180 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:p-12 lg:p-20 overflow-visible">
          <AnimatePresence mode="wait">
            {filteredSections.map(
              ([title, section]) =>
                activeSection === title && (
                  <Section key={title} title={title} content={section} />
                )
            )}
          </AnimatePresence>
        </main>

        {/* Scroll Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-10 left-10 w-14 h-14 bg-primary-green text-white rounded-2xl shadow-2xl shadow-emerald-900/20 flex items-center justify-center hover:bg-emerald-800 hover:-translate-y-2 transition-all z-50"
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <SiteFooter />
    </div>
  );
}

function Section({ title, content }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 max-w-4xl mx-auto"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-xs font-black text-gold-accent uppercase tracking-widest">
          <Sparkles size={14} />
          قسم الأذكار
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">{title}</h2>
        <div className="h-2 w-24 bg-primary-green rounded-full" />
      </div>

      <div className="space-y-8">
        {content.text.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`rounded-[3rem] overflow-hidden border transition-all duration-500 ${openIndex === idx ? 'bg-white border-emerald-50 shadow-2xl shadow-emerald-900/10' : 'bg-white/50 border-transparent hover:border-emerald-50/50'}`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-right p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 group"
            >
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-colors ${openIndex === idx ? 'bg-primary-green text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                    {idx + 1}
                  </span>
                  <div className="h-px flex-1 bg-emerald-50/50" />
                </div>
                <p className={`text-2xl font-quran leading-[1.8] text-slate-800 transition-all ${openIndex === idx ? '' : 'line-clamp-2 opacity-60'}`}>
                  {line}
                </p>
              </div>

              <div className="flex md:flex-col items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(line);
                  }}
                  className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary-green hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-emerald-50"
                  title="نسخ الذكر"
                >
                  <Copy size={18} />
                </button>
                <button
                  className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-red-50"
                >
                  <Heart size={18} />
                </button>
              </div>
            </button>

            <AnimatePresence>
              {openIndex === idx && content.footnote && content.footnote[idx] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-10 pb-10"
                >
                  <div className="p-8 rounded-[2rem] bg-emerald-50/50 border border-emerald-100 flex gap-6">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center text-gold-accent border border-emerald-100 shadow-sm">
                      <BookOpen size={16} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">مصدر الحديث / الفضل</p>
                      <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                        {content.footnote[idx]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

