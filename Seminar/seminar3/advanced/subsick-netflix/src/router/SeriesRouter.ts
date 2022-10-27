import {Router} from "express";
import { SeriesController } from "../controller";

const router: Router = Router();

router.get('/:seriesId', SeriesController.getSeries);

export default router;