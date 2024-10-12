import mongoose from "mongoose";

const gameResultSchema = new mongoose.Schema({
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    ageCategory: {
        type: String,
        enum: ["U10", "U11", "U12", "U13", "U14", "U15", "U16", "U17", "U18", "U19", "Miniminik", "Amatör"],
        required: true,
    },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    homeScore: { type: Number, required: true },
    awayScore: { type: Number, required: true },
    goals: [
        {
            playerId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }, // Gol atan oyuncu
            minute: { type: Number }, // Golün atıldığı dakika
        },
    ],
});

export default mongoose.model("GameResults", gameResultSchema);
