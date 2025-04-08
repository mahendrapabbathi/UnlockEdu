

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser"; // Needed to read cookies
import "dotenv/config";

// App config
const app = express();
const port = process.env.PORT || 4000;

// ✅ Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/user", userRouter);

// ✅ DB Connection
connectDB();

// ✅ Default route
app.get("/", (req, res) => {
    res.send("API working");
});

// ✅ Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
