"use client"
import React from 'react'
import { Compass, Heart, Github, Twitter, Facebook, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export function SiteFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-primary-green pt-24 pb-12 text-white relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 bg-[url('/patterns/subtle-pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-accent/30 to-transparent" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    {/* Brand Info */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                                <Compass className="h-8 w-8 text-gold-accent" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight">نور الإسلام</h2>
                                <p className="text-emerald-300 text-xs font-bold uppercase tracking-[0.2em]">بوابتك للثقافة والسكينة</p>
                            </div>
                        </div>

                        <p className="text-emerald-100/60 leading-relaxed text-sm max-w-md italic">
                            مشروع تقني يهدف إلى تسهيل الوصول للعلوم الشرعية والأدوات اليومية للمسلم، بتصميم يجمع بين الجمال الروحي وسهولة الاستخدام.
                        </p>

                        <div className="flex items-center gap-4">
                            {[Twitter, Facebook, Github].map((Icon, idx) => (
                                <button key={idx} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all text-emerald-200">
                                    <Icon size={18} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-gold-accent uppercase tracking-widest">تصفح سريع</h3>
                        <ul className="space-y-4">
                            {['المصحف الإلكتروني', 'فهرس الأحاديث', 'أذكار المسلم', 'اتجاه القبلة', 'تواصل معنا'].map((link, i) => (
                                <li key={i}>
                                    <Link href="#" className="text-emerald-100/60 hover:text-white transition-colors text-sm font-bold flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gold-accent/40 group-hover:bg-gold-accent transition-colors" />
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Verses & Quotes */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-gold-accent uppercase tracking-widest">آية اليوم</h3>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <p className="text-lg font-quran text-emerald-50 leading-loose mb-4">
                                ﴿إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا﴾
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-300 uppercase">
                                <Heart size={10} fill="currentColor" /> سورة النساء
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs font-bold text-emerald-300/40 uppercase tracking-widest">
                        {currentYear} © جميع الحقوق محفوظة لمنصة نور الإسلام
                    </p>

                    <div className="flex items-center gap-8 text-[10px] font-black text-emerald-300/40 uppercase tracking-widest">
                        <Link href="#" className="hover:text-emerald-200">سياسة الخصوصية</Link>
                        <Link href="#" className="hover:text-emerald-200">شروط الاستخدام</Link>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>الخدمة تعمل بشكل جيد</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
