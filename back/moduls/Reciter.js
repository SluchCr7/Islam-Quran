const mongoose = require("mongoose");

const ReciterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  style: {
    type: String,
    default: "Murattal" // نوع التلاوة (مجود / مرتل)
  },
  country: {
    type: String,
    default: "Unknown"
  },
  photo: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
  },
  audioServer: {
    type: String,
    required: true // رابط الخادم الأساسي (API أو CDN)
  }
}, { timestamps: true });

const Reciter = mongoose.model("Reciter", ReciterSchema);

module.exports = Reciter;
