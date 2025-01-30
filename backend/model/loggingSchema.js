import mongoose from "mongoose";

const loggingSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true,
        default: "abin"
    },
    metadata: {
        type: Object,
        default: {}
    },
    createdAt: { 
        type: Date,
        default: Date.now,
        index: true 
    }
});

const Logging = mongoose.model("Logging", loggingSchema);

export default Logging;
