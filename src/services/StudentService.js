import Student from "../models/Students.js";
import Parent from "../models/Parents.js";

// CREATE STUDENT AND PARENT IN SINGLE REQUEST
export const createStudentAndParent = async (studentData, parentData) => {
    try {
        if (!studentData.parentId) {
            studentData.parentId = null;
        }

        const newStudent = new Student(studentData);
        const savedStudent = await newStudent.save();
        console.log("Öğrenci başarıyla kaydedildi:", savedStudent);

        const newParent = new Parent({
            ...parentData,
            studentId: savedStudent._id,
        });
        const savedParent = await newParent.save();
        console.log("Veli başarıyla kaydedildi:", savedParent);

        const updatedStudent = await Student.findByIdAndUpdate(savedStudent._id, { parentId: savedParent._id }, { new: true });
        console.log("Öğrenci güncellendi, yeni öğrenci verisi:", updatedStudent);

        return { updatedStudent, savedParent };
    } catch (error) {
        console.error("Hata oluştu:", error);
        throw new Error(error.message);
    }
};

// CREATE ONE MORE STUDENT TO EXIST PARENT
export const addStudentToExistingParent = async (parentId, studentData) => {
    try {
        const newStudent = new Student(studentData);
        const savedStudent = await newStudent.save();

        const updatedParent = await Parent.findByIdAndUpdate(parentId, { $push: { studentId: savedStudent._id } }, { new: true });

        const updatedStudent = await Student.findByIdAndUpdate(savedStudent._id, { parentId: parentId }, { new: true });

        return { updatedParent, updatedStudent };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Tüm öğrencileri getir
export const getAllStudents = async () => {
    return await Student.find().populate("parentId coachId");
};

// Belirli bir öğrenciyi getir
export const getStudentById = async (id) => {
    return await Student.findById(id).populate("parentId coachId");
};

// Öğrenciyi güncelle
export const updateStudent = async (id, updateData) => {
    return await Student.findByIdAndUpdate(id, updateData, { new: true });
};

// Öğrenciyi sil
export const deleteStudent = async (id) => {
    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) throw new Error("Öğrenci bulunamadı");
        return student;
    } catch (error) {
        throw new Error(error.message);
    }
};

//PAYMENTS SECTION

//GET STUDENT PAYMENTS BY STUDENT ID ALL YEARS AND MONTHS
export const getStudentPayments = async (studentId) => {
    try {
        const student = await Student.findById(studentId).select("payments");
        if (!student) throw new Error("Öğrenci bulunamadı(backendStudentService)");
        return student.payments;
    } catch (error) {
        throw new Error(error.message || "Öğrenci ödemeleri getirilirken bir hata oluştu(backenStudentService)");
    }
};

//UPDATE STUDENT PAYMENT BY STUDENT ID, YEAR AND MONTH
export const updateStudentPayment = async (studentId, year, month, paymentData) => {
    try {
        const student = await Student.findById(studentId);
        if (!student) throw new Error("Öğrenci bulunamadı(backendStudentService)");

        // FIND THE YEAR INDEX
        const yearIndex = student.payments.findIndex((payment) => payment.year === parseInt(year));
        if (yearIndex === -1) {
            throw new Error(`${year} yılına ait ödeme bilgisi bulunamadı.`);
        }

        // FIND THE MONTH INDEX
        const monthIndex = student.payments[yearIndex].months.findIndex((payment) => payment.month === month);
        if (monthIndex === -1) {
            throw new Error(`${month} ayına ait ödeme bilgisi bulunamadı.`);
        }

        // UPDATE PAYMENT
        student.payments[yearIndex].months[monthIndex].amount += paymentData.amount; // Mevcut tutarın üstüne ekleme yapar
        student.payments[yearIndex].months[monthIndex].isPaid = paymentData.isPaid;
        student.payments[yearIndex].months[monthIndex].paymentDate =
            paymentData.paymentDate || student.payments[yearIndex].months[monthIndex].paymentDate;

        await student.save();
        return student.payments;
    } catch (error) {
        throw new Error(error.message || "Öğrenci ödemesi güncellenirken bir hata oluştu(backendStudentService)");
    }
};
