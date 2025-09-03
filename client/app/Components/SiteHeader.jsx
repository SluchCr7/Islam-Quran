import { Clock, Calendar, Moon, Sunrise, Sun, Sunset, Sparkles, Compass } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="relative border-b border-[#30363d]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 grid place-items-center shadow-lg shadow-emerald-900/30">
            <Compass className="h-6 w-6 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-wide">مواقيت المسلم</h1>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 text-sm text-[#8b949e]">
          <Sparkles className="h-4 w-4" />
          <span>واجهة داكنة مستوحاة من الزخارف الإسلامية</span>
        </div>
      </div>
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
    </header>
  )
}
