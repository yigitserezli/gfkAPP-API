import {
    createStudentAndParent,
    addStudentToExistingParent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentPayments,
    updateStudentPayment,
} from "../services/StudentService.js";

// CREATE STUDENT AND PARENT IN SINGLE API REQUEST
export const createStudentAndParentController = async (req, res) => {
    try {
        const { studentData, parentData } = req.body;
        console.log("İstek verisi: ", { studentData, parentData });

        // Öğrenci ve Veli kaydını yapıyoruz
        const { updatedStudent, savedParent } = await createStudentAndParent(studentData, parentData);

        res.status(201).json({
            message: "Student and Parent have been created successfully!",
            student: updatedStudent,
            parent: savedParent,
        });
    } catch (error) {
        console.error("Hata oluştu:", error);
        res.status(400).json({ message: error.message });
    }
};

// ADD NEW STUDENT TO AN EXISTING PARENT CONTROLLER
export const addStudentToParentController = async (req, res) => {
    try {
        const { parentId, studentData } = req.body;

        // Yeni öğrenciyi mevcut veliye ekleyin
        const { updatedParent, updatedStudent } = await addStudentToExistingParent(parentId, studentData);

        res.status(201).json({
            message: "New student added to existing parent successfully!",
            parent: updatedParent,
            student: updatedStudent,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET ALL STUDENTS
export const getAllStudentsController = async (req, res) => {
    try {
        const students = await getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET STUDENT BY ID
export const getStudentByIdController = async (req, res) => {
    try {
        const student = await getStudentById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE STUDENT
export const updateStudentController = async (req, res) => {
    try {
        const updatedStudent = await updateStudent(req.params.id, req.body);
        if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE STUDENT
export const deleteStudentController = async (req, res) => {
    try {
        const deletedStudent = await deleteStudent(req.params.id);
        if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Delete Student Error:", error);
        res.status(500).json({ message: error.message });
    }
};

//PAYMENT SECTION IN STUDENT

//GET PAYMENTS OF A STUDENT ALL YEARS AND MONTHS
export const getStudentPaymentsController = async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await getStudentPayments(studentId);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//UPDATE PAYMENT OF A STUDENT BY YEAR AND MONTH
export const updateStudentPaymentController = async (req, res) => {
    const { studentId, year, month } = req.params;
    const paymentData = req.body;

    try {
        const updatedPayments = await updateStudentPayment(studentId, year, month, paymentData);
        res.status(200).json({ message: "Aidat bilgisi güncellendi", payments: updatedPayments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
