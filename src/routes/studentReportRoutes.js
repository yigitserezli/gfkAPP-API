import express from "express";
import { createStudentReportController, getAllStudentReportsController, deleteStudentReportController, getStudentReportByIdController, getStudentsWithoutReportForCurrentMonthController } from "../controllers/studentReportController.js";

const router = express.Router();

router.get("/", getAllStudentReportsController); // READ
router.get("/student/:studentId", getStudentReportByIdController); // READ
router.get("/students-without-report", getStudentsWithoutReportForCurrentMonthController); // READ
router.post("/", createStudentReportController); // CREATE
router.delete("/:id", deleteStudentReportController); // DELETE

export default router;
