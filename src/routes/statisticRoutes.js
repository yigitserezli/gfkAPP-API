import express from "express";
import getStatistics from "../controllers/statisticController.js";

const router = express.Router();

router.get("/", getStatistics);

export default router;