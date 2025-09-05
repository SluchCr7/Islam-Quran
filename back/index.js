const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const { errorhandler } = require("./Middelwares/errorHandler");

dotenv.config();
const app = express();

// Connect to DB
connectDB();

// Middleware
const allowedOrigins = [
  "https://islam-roan.vercel.app",
  "http://localhost:3000"
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/api/auth", require("./Routes/UserRoutes"));
app.use("/api/quran", require("./Routes/quranRoutes"));
app.use("/api/hadiths", require("./Routes/hadithRoutes"));
app.use("/api/reciter", require("./Routes/ReciterRoutes"));
app.use(errorhandler)
// ⛔️ لا تستخدم listen على Vercel
module.exports = app;

// Run Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

