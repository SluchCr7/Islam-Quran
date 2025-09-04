import { Play, Pause, StepBack, StepForward } from "lucide-react"

export default function PlayerControls({ isPlaying, togglePlay, nextSurah, prevSurah, surahId, surahs }) {
  
  return (
    <div className="flex items-center justify-center gap-8 mt-4">
      {/* زر السابق */}
      <button
        onClick={prevSurah}
        disabled={surahId === 1}
        className="p-3 bg-gray-800/80 rounded-full hover:bg-gray-700 transition disabled:opacity-40 text-white"
      >
        <StepBack size={24} />
      </button>

      {/* زر التشغيل/الإيقاف */}
      <button
        onClick={togglePlay}
        className="p-6 bg-green-600 rounded-full hover:bg-green-700 shadow-xl transition transform active:scale-95 text-white"
      >
        {isPlaying ? <Pause size={32} /> : <Play size={32} />}
      </button>

      {/* زر التالي */}
      <button
        onClick={nextSurah}
        disabled={surahId === surahs.length}
        className="p-3 bg-gray-800/80 rounded-full hover:bg-gray-700 transition disabled:opacity-40 text-white"
      >
        <StepForward size={24} />
      </button>
    </div>
  )
}
