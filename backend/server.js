import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/dbConfig.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoute from "./routes/aiRoute.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

connectDB();


app.get("/", (req, res) => {
  res.json({ message: "API is live" });
});


app.use("/api/auth", authRoutes);
app.use("/api/user", authMiddleware, userRoutes);
app.use("/api/ai", authMiddleware, aiRoute);
app.get("/api/check", authMiddleware, (req, res) => {
  res.json({ "status": "success", "message": "Authorized", "user": req.user });
});


app.listen(PORT, () => {
  console.log(`Server running on ${PORT} ...`)
});
