import Coach from "../models/Coaches.js";

export const createCoach = async (coachData) => {
    try {
        const existingCoach = await Coach.findOne({ email: coachData.email });
        if (existingCoach) {
            throw new Error("Bu e-posta adresine sahip bir antrenör zaten var.");
        }

        const newCoach = new Coach(coachData);
        return await newCoach.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllCoaches = async () => {
    try {
        return await Coach.find();
    } catch (error) {
        throw new Error(error.message);
    }
}