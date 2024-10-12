import { createCoach, getAllCoaches } from "../services/CoachService.js";

export const createCoachController = async (req, res) => {
    try {
        const coach = await createCoach(req.body);
        res.status(201).json({
            status: "success",
            data: {
                coach,
            },
        });
    } catch (error) {
        console.error("Coach olusturulurken hata olustu: ", error.message);
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};

export const getAllCoachesController = async (req, res) => {
    try {
        const coaches = await getAllCoaches();
        res.status(200).json({
            status: "success",
            data: {
                coaches,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
};
