import { Request, Response } from 'express';
import SeriesService from '../service/SeriesService';

/**
 * @route GET /series/:seriesId
 * @desc 회차 정보 조회
 * @access Public
 */
const getSeries = async (req: Request, res: Response) => {
    const { seriesId } = req.params;
    
    const data = await SeriesService.getSeries(seriesId);
    
    if (!data) {
        return res.status(404).json({status: 404, message: "NOT_FOUND"});
    }
    return res.status(200).json({status: 200, message: "회차 정보 조회 성공", data});
};

export default{
    getSeries,
};