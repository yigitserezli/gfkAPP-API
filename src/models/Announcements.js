import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coaches",
            required: true,
        },
        targetAudience: {
            type: String,
            required: true,
            enum: ["U10", "U11", "U12", "U13", "U14", "U15", "U16", "U17", "U18", "U19", "Miniminik", "Amatör"],
            // Yas kategorisine ait çocuğu olan veliye gidecek
        },
        category: {
            type: String,
            enum: ["General", "Event", "Alert", "Info"],
            default: "General", // Kategori için varsayılan değer
        },
        validUntil: {
            type: Date,
            required: true, // Girilen tarihe kadar gösterilecek, controller'da yada service, isStillShowing false olacak.
        },
        isStillShowing: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model("Announcements", announcementSchema);
