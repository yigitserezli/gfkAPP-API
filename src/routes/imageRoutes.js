import express from "express";
import { updateUserProfileImage } from "../controllers/imageController.js";

const router = express.Router();

router.put("/", updateUserProfileImage);

export default router;