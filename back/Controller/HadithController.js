const axios = require("axios");

// ✅ جلب قائمة الشيوخ (reciters)
const getHadiths = async (req, res) => {
  try {
    const { data } = await axios.get(`https://hadithapi.com/api/hadiths?apiKey=${process.env.HADITH_API_KEY}`);
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching Hadiths:", err.message);
    res.status(500).json({ message: "خطأ في جلب قائمة الاحاديث" });
  }
};

const getAllHadithsByBukhary = async (req, res) => {
  try {
    const { data } = await axios.get(`https://hadithapi.com/api/hadiths?apiKey=${process.env.HADITH_API_KEY}&book=sahih-bukhari`);
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching Hadiths:", err.message);
    res.status(500).json({ message: "خطأ في جلب قائمة الاحاديث" });
  }
};

const getHadithsByMuslim = async (req, res) => {
  try {
    const { data } = await axios.get(`https://hadithapi.com/api/hadiths?apiKey=${process.env.HADITH_API_KEY}&book=sahih-muslim`);
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching Hadiths:", err.message);
    res.status(500).json({ message: "خطأ في جلب قائمة الاحاديث" });
  }
};

const getHadithsByTirmidhi = async (req, res) => {
  try {
    const { data } = await axios.get(`https://hadithapi.com/api/hadiths?apiKey=${process.env.HADITH_API_KEY}&book=sahih-tirmidhi`);
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching Hadiths:", err.message);
    res.status(500).json({ message: "خطأ في جلب قائمة الاحاديث" });
  }
};

module.exports = {getHadiths, getAllHadithsByBukhary , getHadithsByMuslim , getHadithsByTirmidhi};