// Controller/quranController.js
const axios = require("axios");

// ✅ جلب قائمة الشيوخ
const getReciters = async (req, res) => {
  try {
    const { data } = await axios.get("https://api.quran.com/api/v4/resources/recitations");

    if (!data || !data.recitations) {
      return res.status(404).json({ message: "لم يتم العثور على الشيوخ" });
    }

    // رجع شكل ثابت للفرونت
    const reciters = data.recitations.map((r) => ({
      id: r.id,
      reciter_name: r.reciter_name,
      style: r.style || null,
    }));

    res.json({ recitations: reciters });
  } catch (err) {
    console.error("❌ Error fetching reciters:", err.message);
    res.status(500).json({ message: "خطأ في جلب قائمة الشيوخ" });
  }
};

// ✅ جلب قائمة السور
const getSurahs = async (req, res) => {
  try {
    const { data } = await axios.get("https://api.quran.com/api/v4/chapters");

    if (!data || !data.chapters) {
      return res.status(404).json({ message: "لم يتم العثور على السور" });
    }

    const surahs = data.chapters.map((surah) => ({
      id: surah.id,
      name_ar: surah.name_arabic,
      name_en: surah.name_simple,
      revelation_place: surah.revelation_place,
      verses_count: surah.verses_count,
    }));

    res.json({ surahs });
  } catch (err) {
    console.error("❌ Error fetching surahs:", err.message);
    res.status(500).json({ message: "خطأ في جلب قائمة السور" });
  }
};

// ✅ جلب سورة بصوت شيخ
const getSurahAudio = async (req, res) => {
  try {
    const { id, reciterId } = req.params;
    const { data } = await axios.get(
      `https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${id}`
    );

    if (!data || !data.audio_file) {
      return res.status(404).json({ message: "لم يتم العثور على السورة" });
    }

    res.json({
      surahId: id,
      reciterId,
      audioUrl: data.audio_file.audio_url,
    });
  } catch (err) {
    console.error("❌ Error fetching surah audio:", err.message);
    res.status(500).json({ message: "خطأ في جلب تلاوة السورة" });
  }
};

module.exports = { getReciters, getSurahs, getSurahAudio };
