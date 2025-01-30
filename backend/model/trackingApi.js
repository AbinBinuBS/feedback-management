import mongoose from "mongoose";

const trackingSchema = mongoose.Schema({
    method: { 
        type: String, 
        required: true 
    },
    endpoint: { 
        type: String, 
        required: true 
    }, 
    requestBody: { 
        type: Object, 
        default: {} 
    },
    responseBody: { 
        type: Object, 
        default: {} 
    }, 
    statusCode: { 
        type: Number, 
        required: true 
    }, 
    timestamp: { type: Date, default: Date.now } 
});

const Tracking = mongoose.model("Tracking", trackingSchema);

export default Tracking;
