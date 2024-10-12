import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parents",
        default: null, // Bir kullanıcı veli olmayabilir
    },
    coachId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coaches",
        default: null, // Bir kullanıcı öğretmen olmayabilir
    },
    firebaseUID: {
        type: String,
        required: true,
        unique: true, // Her kullanıcı için benzersiz Firebase UID
    },
    isFirstTime: {
        type: Boolean,
        default: true, // Kullanıcının ilk kez giriş yapıp yapmadığını kontrol eder
    },
    lastActive: {
        type: Date,
        default: Date.now, // Kullanıcının en son aktif olduğu tarih
    },
    role: {
        type: String,
        enum: ["coach", "admin", "parent"],
        required: true, // Kullanıcı rolü (Öğretmen, Admin veya Veli)
    },
});

export default mongoose.model("Users", userSchema);
