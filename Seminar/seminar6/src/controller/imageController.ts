import { Request, Response } from "express";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import imageService from "../service/imageService";

//* 이미지 업로드 api
const uploadImage = async (req: Request, res: Response) => {
    const image : Express.MulterS3.File = req.file as Express.MulterS3.File;
    const {location} = image;
    
    if (!location){
        res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_IMAGE));
    }
    
    const data = await imageService.uploadImage(location);

    if(!data){
        res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.CREATE_IMAGE_FAIL));
    }
    res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_IMAGE_SUCCESS,data));

};

const imageController ={
    uploadImage,
};

export default imageController;