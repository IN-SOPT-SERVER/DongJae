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

/**
 * @route POST /toMyList/:seriesId
 * @desc 찜 버튼 누르기
 * @access Public
 */
const toMyList = async (req: Request, res: Response) => {
    const { seriesId } = req.params;
    
    const data = await SeriesService.toMyList(seriesId);
    
    if (!data) {
        return res.status(404).json({
            status: 404, message: "NOT_FOUND"});
    }

    return res.status(200).json({status: 200, message: "찜 하기 성공", data});
};

/**
 * @route Delete /notMyList/:seriesId
 * @desc 찜 버튼 취소하기
 * @access Public
 */
 const notMyList = async (req: Request, res: Response) => {
    const { seriesId } = req.params;
    
    const data = await SeriesService.notMyList(seriesId);
    
    if (!data) {
        return res.status(404).json({
            status: 404, message: "NOT_FOUND"});
    }
    
    return res.status(200).json({status: 200, message: "찜 취소 성공", data});
};

/**
 * @route POST /isEvaluate/:seriesId
 * @desc 평가하기
 * @access Public
 */
 const isEvaluate = async (req: Request, res: Response) => {
    const { seriesId } = req.params;
    const { evalId } = req.body;
    
    
    const data = await SeriesService.createEval(seriesId, evalId);

    if (!data) {
        return res.status(404).json({
            status: 404, message: "NOT_FOUND"});
    }
    
    return res.status(200).json({
        status: 200, message: "작품 평가 성공",data});
};



export default{
    getSeries,
    toMyList,
    notMyList,
    isEvaluate,
};