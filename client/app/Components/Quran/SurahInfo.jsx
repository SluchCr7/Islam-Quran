"use client"

export default function SurahInfo({ surahs, surahId }) {
  const surah = surahs.find((s) => s.id === surahId)
  if (!surah) return null

  return (
    <div className="text-center mb-6">
      <h3 className="text-xl font-semibold text-green-400">{surah.name}</h3>
      <p className="text-sm text-gray-400">
        سورة رقم {surah.id} – عدد الآيات: {surah.ayahs}
      </p>
    </div>
  )
}
