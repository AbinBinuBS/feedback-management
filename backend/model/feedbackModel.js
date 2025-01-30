import mongoose from "mongoose";


const feedbackSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    platform:{
        type:String,
        required:true
    },
    module:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    attachments:{
        type: [String],
        required:false
    },
    tags:{
        type: [String],
        required:true
    }
}, { timestamps: true })

const Feedback = mongoose.model('feedback',feedbackSchema)

export default Feedback