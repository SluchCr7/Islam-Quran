const express = require("express")
const { getPage, getSurahs } = require("../Controller/quranController")

const router = express.Router()

// جلب صفحة
router.get("/page/:page", getPage)

// جلب السور
router.get("/surahs", getSurahs)

module.exports = router
