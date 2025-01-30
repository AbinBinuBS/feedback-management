import Logging from "../model/loggingSchema.js";

export const getAllLogs = async (req, res) => {
    try {
        try {
            const logs = await Logging.find().sort({ createdAt: -1 });
            res.json(logs);
        } catch (error) {
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
