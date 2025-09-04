import { Play, Pause, StepBack, StepForward } from "lucide-react"

export default function PlayerControls({ isPlaying, togglePlay, nextSurah, prevSurah, surahId, surahs }) {
  return (
    <div className="flex items-center justify-center gap-8">
      <button
        onClick={prevSurah}
        disabled={surahId === Number(surahs[0]?.id)}
        className="p-3 bg-gray-800/80 rounded-full hover:bg-gray-700 transition disabled:opacity-40 text-white"
      >
        <StepBack size={26} />
      </button>

      <button
        onClick={togglePlay}
        className="p-8 bg-green-600 rounded-full hover:bg-green-700 shadow-lg transition transform active:scale-95 text-white"
      >
        {isPlaying ? <Pause size={32} /> : <Play size={32} />}
      </button>

      <button
        onClick={nextSurah}
        disabled={surahId === Number(surahs[surahs.length - 1]?.id)}
        className="p-3 bg-gray-800/80 rounded-full hover:bg-gray-700 transition disabled:opacity-40 text-white"
      >
        <StepForward size={26} />
      </button>
    </div>
  )
}
