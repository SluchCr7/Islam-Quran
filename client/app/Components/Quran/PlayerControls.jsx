import { Play, Pause, StepBack, StepForward } from "lucide-react"

export default function PlayerControls({ isPlaying, togglePlay, nextSurah, prevSurah, surahId, surahs }) {

  return (
    <div className="flex items-center justify-center gap-8 py-2">
      <button
        onClick={prevSurah}
        disabled={surahId === 1}
        className="w-12 h-12 flex items-center justify-center bg-white border border-emerald-100 rounded-full text-emerald-600 hover:bg-emerald-50 transition-all disabled:opacity-30 shadow-sm"
      >
        <StepBack size={20} />
      </button>

      <button
        onClick={togglePlay}
        className="w-20 h-20 flex items-center justify-center bg-primary-green rounded-full hover:bg-emerald-800 shadow-xl shadow-emerald-900/20 transition-all transform active:scale-95 text-white"
      >
        {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
      </button>

      <button
        onClick={nextSurah}
        disabled={surahId === surahs.length}
        className="w-12 h-12 flex items-center justify-center bg-white border border-emerald-100 rounded-full text-emerald-600 hover:bg-emerald-50 transition-all disabled:opacity-30 shadow-sm"
      >
        <StepForward size={20} />
      </button>
    </div>
  )
}

