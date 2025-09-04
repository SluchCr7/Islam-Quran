export default function SurahSelector({ surahs, surahId, setSurahId }) {
  return (
    <div className="flex justify-center mb-6">
      <select
        value={String(surahId)}
        onChange={(e) => setSurahId(Number(e.target.value))}
        className="w-72 p-3 text-lg rounded-xl bg-gray-900/80 border border-green-700 focus:ring-2 focus:ring-green-500 text-center text-white"
      >
        {surahs.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name_ar}
          </option>
        ))}
      </select>
    </div>
  )
}
