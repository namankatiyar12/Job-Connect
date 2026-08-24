import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import applicationRoute from "./routes/application.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import userRoute from "./routes/user.route.js";
import connectDB from "./utils/db.js";
dotenv.config({});
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: (process.env.FRONTEND_URI || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim()),
  credentials: true,
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Job Connect API");
});
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, service: "job-connect-api" });
});
//apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use((error, req, res, next) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "File must be 5MB or smaller", success: false });
  }
  if (error instanceof multer.MulterError || error.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({ message: "Only image or PDF uploads are supported", success: false });
  }
  return res.status(500).json({ message: "Unexpected server error", success: false });
});

connectDB().catch((error) => console.error("Database connection failed:", error.message));

if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`server running at port ${PORT}`));
}

export default app;
