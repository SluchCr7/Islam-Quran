"use client"

export default function SurahSelector({ surahId, setSurahId, surahs }) {
  return (
    <div className="flex flex-col gap-3 items-center mb-6">
      <select
        value={surahId}
        onChange={(e) => setSurahId(Number(e.target.value))}
        className="p-3 w-full max-w-xs rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-green-500 transition"
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
