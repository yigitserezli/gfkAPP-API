import StudentReport from "../models/StudentReports.js";
import Student from "../models/Students.js";

export const createStudentReport = async (reportData) => {
    try {
        const newReport = new StudentReport(reportData);
        return await newReport.save();
    } catch (error) {
        throw new Error(error.message);
        console.error("StudentReportService.js içinde hata oluştu:", error);
    }
};

export const getAllStudentReports = async () => {
    try {
        return await StudentReport.find().populate("studentId coachId");
    } catch (error) {
        throw new Error(error.message);
        console.error("StudentReportService.js içinde hata oluştu:", error);
    }
};

export const getStudentReportsByStudentId = async (studentId) => {
    try {
        return await StudentReport.find({ studentId });
    } catch (error) {
        throw new Error(error.message);
        console.error("StudentReportService.js içinde hata oluştu:", error);
    }
};

export const getStudentsWithoutReportForCurrentMonth = async () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    try {
        const students = await Student.find({});

        const studentsWithReports = await StudentReport.find({
            month: currentMonth,
            year: currentYear,
        }).distinct("studentId");

        const studentsWithoutReports = students.filter(
            (student) => !studentsWithReports.some((reportStudentId) => reportStudentId.equals(student._id))
        );
        
        return studentsWithoutReports;
    } catch (error) {
        throw new Error(error.message);
        console.error("StudentReportService.js içinde hata oluştu:", error);
    }
};

export const deleteStudentReport = async (id) => {
    try {
        return await StudentReport.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error.message);
        console.error("StudentReportService.js içinde hata oluştu:", error);
    }
};
