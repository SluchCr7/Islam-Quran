// app/Components/HisnMuslimPage.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hisnData from "../../../utils/hisn_almuslim.json"; // ملف JSON
import { CiSearch } from "react-icons/ci";

export default function HisnMuslimPage() {
  const [activeSection, setActiveSection] = useState(
    () => localStorage.getItem("activeSection") || Object.keys(hisnData)[0]
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  const filteredSections = Object.entries(hisnData).filter(([title, section]) => {
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.text.some((line) => line.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div dir="rtl" className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">حصن المسلم</h1>
        <input
          type="text"
          placeholder="ابحث عن ذكر..."
          className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
          {filteredSections.map(([title], idx) => (
            <li
              key={idx}
              className={`cursor-pointer px-3 py-2 rounded-lg ${
                activeSection === title ? "bg-blue-500 text-white font-semibold" : "hover:bg-blue-100"
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
    </div>
  );
}

function Section({ title, content }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>

      {content.text.map((line, idx) => (
        <motion.div key={idx} layout>
          <div
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="cursor-pointer p-4 border rounded-lg shadow-sm bg-white hover:bg-blue-50 flex justify-between items-center"
          >
            <p className="font-medium">{line.slice(0, 50)}...</p>
            <span className="text-xl">{openIndex === idx ? "-" : "+"}</span>
          </div>

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
