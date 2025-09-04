// Controller/quranController.js
const axios = require("axios");

// ✅ جلب سور المنشاوي (مرتل أو مجود)
const getMinshawiSurahs = async (req, res) => {
  try {
    const { style } = req.params; // "murattal" أو "mujaawwad"

    const { data } = await axios.get("https://mp3quran.net/api/_arabic.json");

    if (!data || !data.reciters) {
      return res.status(404).json({ message: "لم يتم العثور على الشيوخ" });
    }

    // اختار الشيخ حسب النمط المطلوب
    const reciter = data.reciters.find((r) => {
      if (style === "murattal") return r.name.includes("محمد صديق المنشاوي") && r.name.includes("مرتل");
      if (style === "mujaawwad") return r.name.includes("محمد صديق المنشاوي") && r.name.includes("مجود");
      return false;
    });

    if (!reciter) {
      return res.status(404).json({ message: "لم يتم العثور على تلاوات المنشاوي بهذا النمط" });
    }

    // رجع السور مع روابط الصوت
    const surahs = reciter.suras.split(",").map((s) => {
      const surahNum = s.padStart(3, "0"); // صيغة 001.mp3
      return {
        id: parseInt(s),
        name: `سورة ${s}`, // لاحقاً ممكن نجيب أسماء السور بالعربي من ملف خارجي
        audioUrl: `${reciter.server}${surahNum}.mp3`,
      };
    });

    res.json({
      reciter: reciter.name,
      rewaya: reciter.rewaya,
      style,
      surahs,
    });
  } catch (err) {
    console.error("❌ Error fetching Minshawi surahs:", err.message);
    res.status(500).json({ message: "خطأ في جلب سور المنشاوي" });
  }
};

module.exports = { getMinshawiSurahs };
