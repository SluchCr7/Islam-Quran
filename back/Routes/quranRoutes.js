// routes/quranRoutes.js
const express = require("express");
const { getMinshawiSurahs } = require("../Controller/quranController");

const router = express.Router();

// ✅ جلب سور المنشاوي مرتل أو مجود
router.get("/minshawi/:style", getMinshawiSurahs);

module.exports = router;
