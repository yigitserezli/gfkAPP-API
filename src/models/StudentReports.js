import mongoose from "mongoose";

const studentReportSchema = new mongoose.Schema(
    {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Students", required: true },
        coachId: { type: mongoose.Schema.Types.ObjectId, ref: "Coaches", required: true },
        year: { type: Number, required: true, min: 2024 },
        month: { type: Number, required: true, min: 1, max: 12 },
        grades: {
            discipline: { type: Number, min: 0, max: 5, required: true }, // Disiplin
            teamwork: { type: Number, min: 0, max: 5, required: true }, // Takım çalışması
            harmonyWithGroup: { type: Number, min: 0, max: 5, required: true }, // Arkadas iliskisi, saygi, davranis
            physicalCondition: { type: Number, min: 0, max: 5, required: true }, // Fiziksel kondisyon
            technicalCondition: { type: Number, min: 0, max: 5, required: true }, // Teknik kondisyon
            awareness: { type: Number, min: 0, max: 5, required: true }, //Farkindalik
            continuity: { type: Number, min: 0, max: 5, required: true }, //Devamlilik
            interest: { type: Number, min: 0, max: 5, required: true }, // Ilgisi
        },
        comments: { type: String, default: "" }, //Hoca taraifinda ekstra yorum
    },
    { timestamps: true }
);

// Compound index olusturduk. Bu yontem ile ayni ogrenci icin yil ve ayni olan kayit girilemeyecekke.
studentReportSchema.index({ studentId: 1, year: 1, month: 1 }, { unique: true });

export default mongoose.model("StudentReports", studentReportSchema);
