// app/Components/HisnMuslimPage.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hisnData from "../../../utils/hisn_almuslim.json";
import { CiSearch } from "react-icons/ci";
import { FiArrowUp } from "react-icons/fi";

export default function HisnMuslimPage() {
  const [activeSection, setActiveSection] = useState(Object.keys(hisnData)[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // إظهار زر العودة للأعلى عند التمرير
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
    <div dir="rtl" className="min-h-screen transition">
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="md:w-72 w-full bg-gradient-to-b from-blue-50 to-white border-r p-4 sticky top-0 h-screen flex flex-col">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
            حصن المسلم
          </h1>

          {/* شريط البحث */}
          <div className="relative mb-4">
            <CiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن ذكر..."
              className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* قائمة الأقسام */}
          <ul className="space-y-2 overflow-y-auto flex-1">
            {filteredSections.map(([title], idx) => (
              <li
                key={idx}
                className={`cursor-pointer px-4 py-2 rounded-xl transition ${
                  activeSection === title
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => setActiveSection(title)}
              >
                {title}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {filteredSections.map(
            ([title, section]) =>
              activeSection === title && (
                <Section key={title} title={title} content={section} />
              )
          )}
        </main>

        {/* زر العودة للأعلى */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            <FiArrowUp />
          </button>
        )}
      </div>
    </div>
  );
}

function Section({ title, content }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">{title}</h2>

      {content.text.map((line, idx) => (
        <motion.div key={idx} layout>
          {/* العنصر الرئيسي */}
          <div
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="cursor-pointer p-4 border rounded-2xl shadow-md bg-white hover:bg-blue-50 flex justify-between items-center transition"
          >
            <p className="font-medium text-blue-800">{line.slice(0, 50)}...</p>
            <div className="flex items-center gap-3">
              {/* زر نسخ */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(line);
                }}
                className="p-2 text-gray-500 hover:text-blue-600 transition"
              >
                📋
              </button>
              <span className="text-xl">{openIndex === idx ? "-" : "+"}</span>
            </div>
          </div>

          {/* التفاصيل */}
          <AnimatePresence>
            {openIndex === idx && content.footnote && content.footnote[idx] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 border-l-4 border-blue-400 bg-blue-50 text-gray-700 mt-1 rounded-r-lg"
              >
                {line}
                <br />
                {content.footnote[idx]}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
