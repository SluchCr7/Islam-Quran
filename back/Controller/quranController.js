import fetch from "node-fetch"

// 🕌 جلب صفحة معينة
export const getPage = async (req, res) => {
  const { page } = req.params
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/page/${page}/quran-uthmani`)
    const data = await response.json()
    res.json(data) // ممكن ترجع بس ayahs لو محتاج
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب بيانات الصفحة", error })
  }
}

// 📖 جلب كل السور
export const getSurahs = async (req, res) => {
  try {
    const response = await fetch("https://api.alquran.cloud/v1/surah")
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب بيانات السور", error })
  }
}
