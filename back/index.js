const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();
const path = require('path');
const app = express();

// Connect to DB
// connectDB();

// Middleware
app.use(cors({
    origin: "https://islam-roan.vercel.app"
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.use("/api/quran", require("./Routes/quranRoutes"));
app.use("/api/hadiths", require("./Routes/hadithRoutes"));

// Run Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

