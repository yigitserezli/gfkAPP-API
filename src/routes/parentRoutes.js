import express from "express";
import { getAllParentsController, getParentByIdController, updateParentController, deleteParentController } from "../controllers/parentController.js";

const router = express.Router();

router.get("/", getAllParentsController); // GET ALL
router.get("/:id", getParentByIdController); // GET BY ID
router.put("/:id", updateParentController); // UPDATE
router.delete("/:id", deleteParentController); // DELETE

export default router;
