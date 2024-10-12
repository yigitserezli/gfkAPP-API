import FeeSettings from "../models/FeeSettings.js";

export const getLatestFee = async () => {
    const latestFeeSetting = await FeeSettings.findOne().sort({ validFrom: -1 });

    if (!latestFeeSetting) {
        throw new Error("Güncel aidat tutarı bulunamadı");
    }

    return latestFeeSetting.monthlyFee;
};

export const createFeeSetting = async (feeData) => {
    try {
        const newFeeSetting = new FeeSettings(feeData);
        await newFeeSetting.save();
        return newFeeSetting;
    } catch (error) {
        throw new Error("Aidat oluşturulamadı");
    }
}

export default getLatestFee;