"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Book, Scroll, PenTool, Home } from 'lucide-react'

export function BooksGrid() {
    const books = [
        { name: 'صحيح البخاري', slug: 'bukhary', color: 'from-amber-100 to-white', text: 'text-amber-800', badge: 'حديث', icon: '📖', description: 'أصح الكتب بعد كتاب الله' },
        { name: 'صحيح مسلم', slug: 'muslim', color: 'from-blue-100 to-white', text: 'text-blue-800', badge: 'حديث', icon: '📜', description: 'الجامع الصحيح للإمام مسلم' },
        { name: 'سنن الترمذي', slug: 'tirmidhi', color: 'from-emerald-100 to-white', text: 'text-emerald-800', badge: 'حديث', icon: '🖋️', description: 'كتاب السنن المأثورة' },
        { name: 'حصن المسلم', slug: 'hisn', color: 'from-purple-100 to-white', text: 'text-purple-800', badge: 'أذكار', icon: '🕋', description: 'أذكار الكتاب والسنة' },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => {
                const href = book.slug === 'hisn' ? `/Pages/Hisn` : `/Pages/Hadith/${book.slug}`
                return (
                    <Link key={book.slug} href={href} className="group">
                        <motion.div
                            whileHover={{ y: -12 }}
                            className={`relative rounded-[2.5rem] p-8 h-64 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${book.color} border border-white shadow-xl shadow-slate-200/50 transition-all duration-500`}
                        >
                            <div className="absolute top-6 right-6 px-3 py-1 text-[10px] font-black rounded-full bg-white/80 text-slate-500 backdrop-blur-md shadow-sm border border-white/50 uppercase tracking-widest">
                                {book.badge}
                            </div>

                            <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                {book.icon}
                            </div>

                            <div className="text-center">
                                <span className={`block font-black text-xl mb-2 ${book.text}`}>
                                    {book.name}
                                </span>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                                    {book.description}
                                </p>
                            </div>

                            <div className={`absolute bottom-6 flex items-center gap-2 text-xs font-black ${book.text} opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500`}>
                                <span>استكشف الكتاب</span>
                                <ChevronRight size={14} />
                            </div>

                            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:bg-white/40 transition-colors" />
                        </motion.div>
                    </Link>
                )
            })}
        </div>
    )
}
