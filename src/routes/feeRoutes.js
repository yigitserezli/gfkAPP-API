import express from "express";
import { createFeeSettingController, getLatestFeeController } from "../controllers/feeController.js";

const router = express.Router();

router.post("/", createFeeSettingController)
router.get("/", getLatestFeeController)

export default router;