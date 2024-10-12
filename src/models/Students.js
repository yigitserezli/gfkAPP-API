import mongoose from "mongoose";

export const generateDefaultPayments = () => {
    const years = [2024, 2025, 2026];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const payments = years.map((year) => ({
        year,
        months: months.map((month) => ({
            month,
            amount: 0,
            isPaid: false,
            paymentDate: null,
        })),
    }));
    return payments;
};

const paymentSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    months: [
        {
            month: {
                type: String,
                enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                required: true,
            },
            amount: { type: Number, default: 0 },
            isPaid: { type: Boolean, default: false },
            paymentDate: { type: Date, default: null },
        },
    ],
});

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        birthDate: { type: Date, required: true },
        height: { type: Number, required: true },
        weight: { type: Number, required: true },
        ageCategory: {
            type: String,
            enum: ["U10", "U11", "U12", "U13", "U14", "U15", "U16", "U17", "U18", "U19", "Miniminik", "Amatör"],
        },
        parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Parents", default: null },
        coachId: { type: mongoose.Schema.Types.ObjectId, ref: "Coaches", default: null },
        preferredFoot: { type: String, enum: ["right", "left", "both"], lowercase: true },
        payments: {
            type: [paymentSchema], // Payments alanı bir dizi alt şema olarak tanımlanır
            default: generateDefaultPayments(), // Varsayılan değer fonksiyonu ekleniyor
        },
    },
    { timestamps: true }
);

export default mongoose.model("Students", studentSchema);
