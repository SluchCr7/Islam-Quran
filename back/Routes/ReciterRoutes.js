const express = require("express");
const {
  getReciters,
  getReciterById,
  createReciter,
  updateReciter,
  deleteReciter
} = require("../Controller/ReciterController");

const router = express.Router();

// GET /api/reciters -> جلب كل القراء
router.get("/", getReciters);

// GET /api/reciters/:id -> جلب قارئ محدد
router.get("/:id", getReciterById);

// POST /api/reciters -> إضافة قارئ جديد
router.post("/", createReciter);

// PUT /api/reciters/:id -> تحديث قارئ
router.put("/:id", updateReciter);

// DELETE /api/reciters/:id -> حذف قارئ
router.delete("/:id", deleteReciter);

module.exports = router;
