import express from "express";
import { createCoachController, getAllCoachesController } from "../controllers/coachController.js";

const router = express.Router();

router.get("/", getAllCoachesController); // READ
router.post("/", createCoachController); // CREATE

export default router;
