const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");   // المسار الصحيح حسب مشروعك
const { errorhandler } = require("./Middelwares/errorHandler");

dotenv.config();
const app = express();

// Connect DB
connectDB();

// Middleware
const allowedOrigins = [
  "https://islam-mu.vercel.app",
  // "http://localhost:3000",
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/api/auth", require("../Routes/UserRoutes"));
app.use("/api/quran", require("../Routes/quranRoutes"));
app.use("/api/hadiths", require("../Routes/hadithRoutes"));
app.use("/api/reciter", require("../Routes/ReciterRoutes"));

app.use(errorhandler);

// ⛔️ لا تستخدم app.listen في Vercel
module.exports = app;
