
import { Router } from "express";
import { getAllLogs } from "../controller/loggingController.js";

const router = Router()

router.get('/logging', getAllLogs)




export default router