"use client"
import { Compass, Sparkles, LogOut, User, Settings, LogIn } from "lucide-react"
import { useAuth } from "../Context/UserContext"
import { useState } from "react"

export function SiteHeader() {
  const { user, isLogin, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="relative border-b border-[#30363d]/60 bg-gradient-to-br from-[#0d1117] to-[#161b22]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 grid place-items-center shadow-lg shadow-emerald-900/30">
            <Compass className="h-6 w-6 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-wide">مواقيت المسلم</h1>
            <p className="hidden md:block text-xs text-[#8b949e]">دليلك للصلاة والقرآن</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {!isLogin ? (
            <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 transition px-4 py-2 rounded-xl text-sm font-bold shadow-md">
              <LogIn className="w-4 h-4" />
              تسجيل الدخول
            </button>
          ) : (
            <div className="relative">
              {/* User Avatar */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img
                  src={user?.user?.profilePhoto?.url || "/default-avatar.png"}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-emerald-500 shadow-md"
                />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute left-0 mt-3 w-48 bg-[#161b22] border border-[#30363d] rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 text-sm text-gray-200 border-b border-[#30363d]">
                    <p className="font-bold text-yellow-400">{user?.user?.Name}</p>
                    <p className="text-xs text-gray-400">{user?.user?.Email}</p>
                  </div>
                  <ul className="text-sm text-gray-300">
                    <li>
                      <a href="/Pages/Profile" className="flex items-center gap-2 px-4 py-3 hover:bg-[#1f2937] transition">
                        <User className="w-4 h-4 text-yellow-400" />
                        الملف الشخصي
                      </a>
                    </li>
                    {/* <li>
                      <a href="/Pages/Settings" className="flex items-center gap-2 px-4 py-3 hover:bg-[#1f2937] transition">
                        <Settings className="w-4 h-4 text-yellow-400" />
                        الإعدادات
                      </a>
                    </li> */}
                    <li>
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-600/20 transition text-red-400"
                      >
                        <LogOut className="w-4 h-4" />
                        تسجيل الخروج
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
    </header>
  )
}
