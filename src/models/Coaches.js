import mongoose from "mongoose";

// Coach Schema
const coachSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
            trim: true, // Soyadı trimleyerek girilen boşlukları temizler
        },
        email: {
            type: String,
            required: true,
            unique: true, // E-postanın benzersiz olması
            lowercase: true, // Küçük harfe çevirir
            validate: {
                validator: function (v) {
                    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v); // E-posta doğrulama
                },
                message: (props) => `${props.value} geçerli bir e-posta adresi değil!`,
            },
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^\d{10}$/.test(v); // Telefon numarasının 10 haneli olup olmadığını kontrol eder
                },
                message: (props) => `${props.value} geçerli bir telefon numarası değil!`,
            },
        },
        birthDate: { type: Date },
    },
    {
        timestamps: true, // Oluşturulma ve güncellenme tarihlerini otomatik ekler
    }
);

export default mongoose.model("Coaches", coachSchema);
