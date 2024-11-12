import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";

import { errorHandler } from "./middleware/errorMiddleware";
import jobSeekerRoutes from "./routes/jobSeekerRoutes";
import companyRoutes from "./routes/companyRoutes";
import authRoutes from "./routes/authRoutes";
import feedbackRoute from "./routes/feedbackRoutes";

dotenv.config({ path: ".env" });

const app = express();
const httpServer = createServer(app);

app.get("/", (req, res) => {
  res.send("API is running.");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/jobseekers", jobSeekerRoutes);
app.use("/api/v1/feedback", feedbackRoute);

// Global error handling middleware
app.use(errorHandler);

export { app, httpServer };
