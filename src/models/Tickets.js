import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        status: {
            type: String,
            enum: ["open", "in_progress", "pending", "resolved", "closed"],
            //open: Talep acik ve cozum beklenmekte
            //in_progress: talep uzerinde calisilmakta
            //pending: Ek bilgi veya dis bir taraftan yanit beklenmekte
            //resolved: Talep cozuldu ama henuz kapatilmadi, veya sonuc gerceklesmedi.
            //closed: Talep tamamen kapatildi, gerekli aksiyonlar alindi ve bitti.
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Coaches", default: null },
        closedAt: { type: Date, default: null },
        messages: [
            {
                sender: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
                message: { type: String, required: true },
                sentAt: { type: Date, default: Date.now },
                role: {
                    type: String,
                    enum: ["user", "coach"],
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);
export default mongoose.model("Tickets", ticketSchema);
