const express = require("express");
const { getReciters, getSurahAudio , getSurahs } = require("../Controller/quranController");

const router = express.Router();

// جلب قائمة الشيوخ
router.get("/reciters", getReciters);

router.get("/surahs", getSurahs)

// جلب سورة بصوت شيخ معين
router.get("/surah/:id/:reciterId", getSurahAudio);

module.exports = router;
