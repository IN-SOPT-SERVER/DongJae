import {Router} from "express";
import { SeriesController } from "../controller";

const router: Router = Router();

router.get('/:seriesId', SeriesController.getSeries);
router.post('/isEvaluate/:seriesId', SeriesController.isEvaluate); //평가버튼
router.post('/toMyList/:seriesId', SeriesController.toMyList); //찜 버튼
router.delete('/notMyList/:seriesId', SeriesController.notMyList); //찜 취소

export default router;