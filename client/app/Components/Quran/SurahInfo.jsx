export default function SurahInfo({ surahs, surahId, ayahs }) {
  return (
    <div className="mt-6 text-lg text-gray-200 font-medium text-center">
      {ayahs.length
        ? `سورة ${surahs.find((s) => Number(s.id) === Number(surahId))?.name_ar || "سورة"}`
        : "⏳ جاري تحميل التلاوة..."}
    </div>
  )
}
