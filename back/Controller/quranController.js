const axios = require("axios")

// 🕌 جلب صفحة معينة
const getPage = async (req, res) => {
  const { page } = req.params
  try {
    const response = await axios.get(
      `https://api.alquran.cloud/v1/page/${page}/quran-uthmani`
    )
    res.json(response.data) // ممكن ترجع بس ayahs لو محتاج
  } catch (error) {
    res
      .status(500)
      .json({ message: "خطأ في جلب بيانات الصفحة", error: error.message })
  }
}

// 📖 جلب كل السور
const getSurahs = async (req, res) => {
  try {
    const response = await axios.get("https://api.alquran.cloud/v1/surah")
    res.json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ message: "خطأ في جلب بيانات السور", error: error.message })
  }
}

module.exports = { getPage, getSurahs }
