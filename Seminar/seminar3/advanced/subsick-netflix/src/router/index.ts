import {Router} from "express";
import SeriesRouter from "./SeriesRouter";

const router: Router = Router();

router.use('/series', SeriesRouter);

export default router;