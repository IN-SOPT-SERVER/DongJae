import { Router } from "express";
import imageController from "../controller/imageController";
import {upload } from "../middlewares";


const router : Router = Router();

router.post("/", upload.single("file"), imageController.uploadImage);

export default router;