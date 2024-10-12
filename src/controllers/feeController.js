import { createFeeSetting, getLatestFee } from "../services/FeeSettingService.js";

export const createFeeSettingController = async (req, res) => {
    try {
        const { year, monthlyFee, validFrom } = req.body;

        if (!year || !monthlyFee || !validFrom) {
            return res.status(400).json({ message: "Eksik bilgi" });
        }

        const newFeeSetting = await createFeeSetting({ year, monthlyFee, validFrom });
        return res.status(201).json(newFeeSetting);
    } catch (error) {
        console.error("Error in createFeeSettingController:", error);
        return res.status(500).json({ message: error.message });
    }
};

export const getLatestFeeController = async (req, res) => {
    try {
        const latestFee = await getLatestFee();
        return res.status(200).json(latestFee);
    } catch (error) {
        console.error("Error in getLatestFeeController:", error);
        return res.status(500).json({ message: error.message });
    }
};