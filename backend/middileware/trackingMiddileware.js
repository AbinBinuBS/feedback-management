import Tracking from "../model/trackingApi.js";

const trackAPI = async (req, res, next) => {
    const startTime = Date.now();

    const originalSend = res.json;
    res.json = async function (body) {
        const responseTime = Date.now() - startTime;

        try {
            await Tracking.create({
                method: req.method,
                endpoint: req.originalUrl,
                requestBody: req.body,
                responseBody: body,
                statusCode: res.statusCode,
                timestamp: new Date()
            });
        } catch (error) {
            console.error("Error logging API request:", error);
        }

        return originalSend.call(this, body);
    };

    next();
};

export default trackAPI;
