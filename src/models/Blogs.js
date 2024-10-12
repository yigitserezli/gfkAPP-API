import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true, maxlength: 10000 },
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        category: { type: String, required: true },
        comments: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
                content: { type: String, required: true, maxlength: 1000 },
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Blogs", blogSchema);
