export default function ProgressBar({ progress, duration, setProgress, audioRef, formatTime }) {
  return (
    <div className="w-full mt-6 px-6">
      <input
        type="range"
        value={progress}
        max={duration || 0}
        step="0.1"
        onChange={(e) => {
          const val = Number(e.target.value)
          if (audioRef.current) audioRef.current.currentTime = val
          setProgress(val)
        }}
        className="w-full accent-green-500"
      />
      <div className="flex justify-between text-sm text-gray-400 mt-1">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}
