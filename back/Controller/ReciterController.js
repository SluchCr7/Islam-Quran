const Reciter = require("../moduls/Reciter");

// جلب جميع القراء
const getReciters = async (req, res) => {
  try {
    const reciters = await Reciter.find();
    res.status(200).json(reciters);
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء جلب القراء", error });
  }
};

// جلب قارئ واحد
const getReciterById = async (req, res) => {
  try {
    const reciter = await Reciter.findById(req.params.id);
    if (!reciter) return res.status(404).json({ message: "القارئ غير موجود" });
    res.status(200).json(reciter);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب القارئ", error });
  }
};

// إضافة قارئ جديد
const createReciter = async (req, res) => {
  try {
    const newReciter = new Reciter(req.body);
    await newReciter.save();
    res.status(201).json(newReciter);
  } catch (error) {
    res.status(400).json({ message: "خطأ في إضافة القارئ", error });
  }
};

// تحديث بيانات قارئ
const updateReciter = async (req, res) => {
  try {
    const updatedReciter = await Reciter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReciter) return res.status(404).json({ message: "القارئ غير موجود" });
    res.status(200).json(updatedReciter);
  } catch (error) {
    res.status(400).json({ message: "خطأ في التحديث", error });
  }
};

// حذف قارئ
const deleteReciter = async (req, res) => {
  try {
    const deletedReciter = await Reciter.findByIdAndDelete(req.params.id);
    if (!deletedReciter) return res.status(404).json({ message: "القارئ غير موجود" });
    res.status(200).json({ message: "تم حذف القارئ بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في الحذف", error });
  }
};

module.exports = {
  getReciters,
  getReciterById,
  createReciter,
  updateReciter,
  deleteReciter
};
