import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true, trim: true },
        job: { type: String },
        email: {
            type: String,
            required: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            maxlength: 10,
            minlength: 10,
            match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
        },
        address: { type: String },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", default: null },
        studentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Students", required: true }],
    },
    { timestamps: true }
);

export default mongoose.model("Parents", parentSchema);
