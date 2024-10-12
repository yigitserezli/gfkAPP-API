import {
    createStudentReport,
    getAllStudentReports,
    deleteStudentReport,
    getStudentReportsByStudentId,
    getStudentsWithoutReportForCurrentMonth,
} from "../services/StudentReportService.js";

export const createStudentReportController = async (req, res) => {
    try {
        const report = await createStudentReport(req.body);
        res.status(201).json({
            status: "success",
            data: {
                report,
            },
        });
    } catch (error) {
        console.error("Öğrenci raporu oluşturulurken hata oluştu: ", error.message);
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

export const getAllStudentReportsController = async (req, res) => {
    try {
        const reports = await getAllStudentReports();
        res.status(200).json({
            status: "success",
            data: {
                reports,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

export const getStudentReportByIdController = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const reports = await getStudentReportsByStudentId(studentId);

        if (!studentId) {
            return res.status(400).json({
                status: "fail",
                message: "Geçersiz öğrenci ID'si",
            });
        }

        if (!reports) {
            return res.status(404).json({
                status: "fail",
                message: "Rapor bulunamadı",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                reports,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

export const getStudentsWithoutReportForCurrentMonthController = async (req, res) => {
    try {
        const studentsWithoutReports = await getStudentsWithoutReportForCurrentMonth();
        return res.status(200).json({
            status: "success",
            data: {
                studentsWithoutReports,
            },
        });
    } catch (error) {
        return res.status(400).json({
            status: "fail",
            message: "Karnesi olmayan öğrenciler getirilirken bir hata oluştu",
            error: error.message,
        });
    }
};

export const deleteStudentReportController = async (req, res) => {
    try {
        const report = await deleteStudentReport(req.params.id);
        if (!report) {
            return res.status(404).json({
                status: "fail",
                message: "Rapor bulunamadı",
            });
        }
        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};
