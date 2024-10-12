import mongoose from "mongoose";

const feeSettingSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    monthlyFee: { type: Number, required: true },
    lastUpdated: { type: Date, default: Date.now },
    validFrom: { type: Date, required: true },
});

export default mongoose.model("FeeSettings", feeSettingSchema);
