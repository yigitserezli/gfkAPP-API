import getStatistics from "../services/StatisticService.js";

const getStatisticsController = async (req, res) => {
    try {
        const statistics = await getStatistics();
        res.status(200).json(statistics);
    } catch (error) {
        console.error("Error in getStatistics controller:", error);
        res.status(500).json({ message: error.message });
    }
};

export default getStatisticsController;