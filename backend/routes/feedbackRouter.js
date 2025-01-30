
import { Router } from "express";
import { addPost, deleteFeedbacks, editPost, getAllFeedbacks } from "../controller/feedbackController.js";
import multipleImageUpload from "../config/multer.js";

const router = Router()

router.get('/feedbacks', getAllFeedbacks)
router.post('/feedbacks', multipleImageUpload, addPost)
router.put('/feedbacks/:id', multipleImageUpload, editPost)
router.delete('/feedbacks/:id', deleteFeedbacks)




export default router