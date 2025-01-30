
import { Router } from "express";
import { getAllApiDetails, getAllLogs } from "../controller/loggingController.js";

const router = Router()

router.get('/logging', getAllLogs)
router.get('/trakingDetails', getAllApiDetails)




export default router