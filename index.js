import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cors from "cors";
//ROUTES//
import studentRoutes from "./src/routes/studentRoutes.js";
import parentRoutes from "./src/routes/parentRoutes.js";
import coachRoutes from "./src/routes/coachRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import imageRoutes from "./src/routes/imageRoutes.js";
import statisticRoutes from "./src/routes/statisticRoutes.js";
import feeRoutes from "./src/routes/feeRoutes.js";
import studentReportRoutes from "./src/routes/studentReportRoutes.js";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api/students", studentRoutes); //FOR STUDENTS CRUD
app.use("/api/parents", parentRoutes); //FOR PARENTS CRUD
app.use("/api/coaches", coachRoutes); //FOR COACHES CRUD
app.use("/api/users", userRoutes); //FOR USERS CRUD
app.use("/api/images", imageRoutes); //FOR IMAGES CRUD
app.use("/api/statistics", statisticRoutes); //FOR STATISTICS
app.use("/api/fees", feeRoutes); //FOR FEES CRUD
app.use("/api/reports", studentReportRoutes); //FOR STUDENT REPORTS CRUD
//ROUTES

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});