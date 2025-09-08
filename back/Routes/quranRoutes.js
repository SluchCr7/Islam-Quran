import express from "express"
import { getPage, getSurahs } from "../Controller/quranController"

const router = express.Router()

// جلب صفحة
router.get("/page/:page", getPage)

// جلب السور
router.get("/surahs", getSurahs)

export default router
