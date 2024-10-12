import express from "express";
import {
    createStudentAndParentController,
    addStudentToParentController,
    getAllStudentsController,
    getStudentByIdController,
    updateStudentController,
    deleteStudentController,
    getStudentPaymentsController,
    updateStudentPaymentController,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", createStudentAndParentController); // CREATE STUDENT AND PARENT IN SINGLE API REQUEST
router.post("/add-to-parent", addStudentToParentController); //ADD ONE MORE STUDENT TO EXISTING PARENT
router.get("/", getAllStudentsController); // GET ALL
router.get("/:id", getStudentByIdController); // GET BY ID
router.put("/:id", updateStudentController); // UPDATE
router.delete("/:id", deleteStudentController); // DELETE

//PAYMENTS
router.get("/:studentId/payments", getStudentPaymentsController);
router.put("/:studentId/payments/:year/:month", updateStudentPaymentController);

export default router;
