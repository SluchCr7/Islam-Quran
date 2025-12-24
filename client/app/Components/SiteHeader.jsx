"use client"
import { Compass, Sparkles, LogOut, User, Settings, LogIn, Menu, X, Home, Book, Quote, Heart, Map } from "lucide-react"
import { useAuth } from "../Context/UserContext"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export function SiteHeader() {
  const { user, isLogin, logout } = useAuth()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { title: 'الرئيسية', href: '/', icon: Home },
    { title: 'القرآن الكريم', href: '#quran', icon: Book },
    { title: 'الأحاديث', href: '#hadith', icon: Quote },
    { title: 'حصن المسلم', href: '/Pages/Hisn', icon: Heart },
    { title: 'القبلة', href: '#qibla', icon: Map },
  ]

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-emerald-100 py-3 shadow-sm" : "bg-transparent py-5"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary-green to-emerald-light grid place-items-center shadow-lg shadow-emerald-900/20 group-hover:rotate-12 transition-transform duration-300">
              <Compass className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-primary-green">نور الإسلام</h1>
              <p className="hidden lg:block text-[10px] uppercase tracking-widest text-emerald-600 font-semibold">بوابتك للثقافة والسكينة</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-primary-green transition-colors relative group"
              >
                {item.title}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gold-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {!isLogin ? (
              <Link href="/Login" className="flex items-center gap-2 bg-primary-green text-white hover:bg-emerald-800 transition-all px-6 py-2.5 rounded-full text-sm font-bold shadow-md shadow-emerald-900/10">
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">تسجيل الدخول</span>
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center p-0.5 rounded-full border-2 border-emerald-200 hover:border-emerald-500 transition-colors focus:outline-none"
                >
                  <img
                    src={user?.user?.profilePhoto?.url || "/default-avatar.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-3 w-56 bg-white border border-emerald-100 rounded-2xl shadow-xl overflow-hidden z-50 p-2"
                    >
                      <div className="px-4 py-3 border-b border-emerald-50 mb-2">
                        <p className="font-bold text-slate-800 text-sm">{user?.user?.Name || "المستخدم"}</p>
                        <p className="text-[10px] text-slate-500 truncate">{user?.user?.Email}</p>
                      </div>
                      <ul className="space-y-1">
                        <li>
                          <Link href="/Pages/Profile" className="flex items-center gap-3 px-3 py-2.5 hover:bg-emerald-50 rounded-xl transition-colors text-slate-700 text-sm">
                            <User className="w-4 h-4 text-emerald-600" />
                            الملف الشخصي
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 rounded-xl transition-colors text-red-600 text-sm"
                          >
                            <LogOut className="w-4 h-4" />
                            تسجيل الخروج
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-emerald-50 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {!scrolled && (
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent" />
        )}
      </header>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[100] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary-green flex items-center justify-center">
                    <Compass className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-primary-green text-right">نور الإسلام</h2>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-emerald-50 rounded-full">
                  <X size={20} className="text-emerald-600" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-emerald-50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-primary-green group-hover:text-white transition-colors">
                      <link.icon size={20} />
                    </div>
                    <span className="text-lg font-bold text-slate-700">{link.title}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-auto p-6 rounded-3xl bg-emerald-50 text-center">
                <p className="text-xs text-emerald-600 font-bold mb-4 italic tracking-wider leading-relaxed">
                  "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا"
                </p>
                <Link
                  href="/Pages/Donation"
                  className="inline-block py-3 px-6 bg-primary-green text-white rounded-full text-xs font-bold shadow-lg shadow-emerald-900/10"
                >
                  ادعم استمرارنا
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}


