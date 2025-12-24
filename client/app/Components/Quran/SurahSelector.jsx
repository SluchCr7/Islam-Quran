"use client"

export default function SurahSelector({ surahId, setSurahId, surahs }) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <select
        value={surahId}
        onChange={(e) => setSurahId(Number(e.target.value))}
        className="w-full bg-transparent text-slate-800 font-bold text-lg text-center appearance-none focus:outline-none cursor-pointer"
      >
        {surahs.map((surah) => (
          <option key={surah.id} value={surah.id}>
            {surah.id}. {surah.name}
          </option>
        ))}
      </select>
    </div>
  )
}

