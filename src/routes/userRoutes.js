import express from "express";
import { createUserController, getAllUsersController, getUserByIdController, getUserByFirebaseUidController } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUserController);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.get("/firebase/:firebaseUid", getUserByFirebaseUidController);

export default router;