"use client"
import { BookOpen } from "lucide-react"

export default function PlayerHeader() {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-600/20 shadow-lg mb-3">
        <BookOpen className="w-10 h-10 text-green-400" />
      </div>
      <h2 className="text-2xl font-bold text-white">مشغل القرآن الكريم</h2>
      <p className="text-sm text-gray-400">بصوت الشيخ محمد صديق المنشاوي</p>
    </div>
  )
}
