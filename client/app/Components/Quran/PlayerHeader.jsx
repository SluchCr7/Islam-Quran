"use client"
import { Music2 } from "lucide-react"

export default function PlayerHeader() {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-emerald-50 text-primary-green shadow-sm border border-emerald-100 transform rotate-3">
        <Music2 className="w-8 h-8" />
      </div>
      <div>
        <h2 className="text-xl font-black text-slate-800">مشغل القرآن الكريم</h2>
        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em]">بصوت الشيخ محمد صديق المنشاوي</p>
      </div>
    </div>
  )
}

