
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';
import Feedback from '../model/feedbackModel.js';
import Logging from '../model/loggingSchema.js';

export const getAllFeedbacks = async (req, res) =>{
    try{
        const feedbacks = await Feedback.find()
        res.status(200).json({message:"seccess",feedbacks})
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


export const addPost = async (req, res) => {
    try {
        let uploadedFiles = [];
        if (req.files && req.files.images && req.files.images.length > 0) {
            uploadedFiles = await Promise.all(
                req.files.images.map(async (file) => {
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: 'feedback',
                    });
                    fs.unlink(file.path, () => {});
                    return result.secure_url;
                })
            );
        }
        const feedback = new Feedback({
            title: req.body.title,
            platform: req.body.platform,
            module: req.body.module,
            description: req.body.description,
            tags: req.body.tags ? JSON.parse(req.body.tags) : [],
            attachments: uploadedFiles,
        });
        await feedback.save();
        await Logging.create({
            action: "Feedback Created",
            user: "abin",
            metadata: { feedbackId: feedback._id, title:feedback.title, platform:req.body.platform }
        });
        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, platform, module, description, tags, existingImages } = req.body; 
        let feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        let uploadedFiles = [];
        if (req.files?.images) {
            let filesArray = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
            uploadedFiles = await Promise.all(
                filesArray.map(async (file) => {
                    if (!file.path) return null;
                    const result = await cloudinary.uploader.upload(file.path, { folder: 'feedback' });
                    fs.unlink(file.path, () => {}); 
                    return result.secure_url;
                })
            );
        }
        
        uploadedFiles = uploadedFiles.filter(url => url !== null);
        let oldImages = Array.isArray(existingImages) ? existingImages : JSON.parse(existingImages || "[]");
        const updatedAttachments = [...new Set([...oldImages, ...uploadedFiles])].filter(img => img);
        feedback.title = title || feedback.title;
        feedback.platform = platform || feedback.platform;
        feedback.module = module || feedback.module;
        feedback.description = description || feedback.description;
        feedback.tags = tags ? JSON.parse(tags) : feedback.tags;
        feedback.attachments = updatedAttachments;
        await feedback.save();
        await Logging.create({
            action: "Feedback Edited",
            user: "abin",
            metadata: { feedbackId: feedback._id, title:feedback.title, platform:feedback.platform }
        });
        res.status(200).json({ message: "Feedback updated successfully", feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deleteFeedbacks = async (req, res) => {
    try {
        const feedbackId = req.params.id;
        const feedback = await Feedback.findByIdAndDelete(feedbackId);
        await Logging.create({
            action: "Feedback deleted",
            user: "abin",
            metadata: { feedbackId: feedback._id, title:feedback.title, platform:feedback.platform }
        });
        res.status(200).json({ message: "Success", feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

