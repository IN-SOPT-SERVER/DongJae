import { fail, success } from './../constants/response';
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { rm, sc } from "../constants";
import { userService } from "../service";
import jwtHandler from '../modules/jwtHandler';
import { UserSignInDto } from '../interfaces/UserSignInDto';
import { UserCreateDTO } from '../interfaces/UserCreateDto';

//* 유저 조회
const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const data = await userService.getUserById(+userId);

  if (!data) {
    return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  }
  return res.status(200).json({ status: 200, message: "유저 조회 성공", data });
};

//* 유저 전체 조회
const getAllUser =async (req:Request, res:Response) => {
  const { page, limit } = req.query

  const data = await userService.getAllUser(Number(page), Number(limit));

  return res.status(200).json({ status: 200, message: "유저 조회 성공", data});
}

//* 유저 생성
const createUser =async (req:Request, res:Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }

  const userCreateDto: UserCreateDto = req.body;
  const data = await userService.createUser(userCreateDto);

  if (!data) {
    return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  }

    // ================== 여기 추가 ========================
  //? 아까 만든 jwtHandler 내 sign 함수를 이용해 accessToken 생성
  const accessToken = jwtHandler.sign(data.id);

  const result = {
    id: data.id,
    name: data.userName,
    accessToken,
  };

  return res.status(sc.CREATED).send(success(sc.CREATED, rm.SIGNUP_SUCCESS, result));
}

//* 유저 수정
const updateUser =async (req:Request, res:Response) => {
  const { userId } = req.params;
  const { userName } = req.body;

  if (!userName) {
    return res.status(400).json({ status: 400, message: "돌아가세요." })
  }

  const updatedUser = await userService.updateUser(+userId, userName);

  return res.status(200).json({ status: 200, message: "유저 수정 성공", updatedUser});
}

//* 유저 삭제
const deleteUser =async (req:Request, res:Response) => {
  const { userId } = req.params;
  
  const data = await userService.deleteUser(+userId);

  return res.status(200).json({ status: 200, message: "유저 삭제 성공", data});
}

//* 로그인
const signInUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }

  const userSignInDto: UserSignInDto = req.body;

  try {
    const data = await userService.signIn(userSignInDto);

    if (!data) return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.NOT_FOUND));
    else if (data === sc.UNAUTHORIZED)
      return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.INVALID_PASSWORD));

    const accessToken = jwtHandler.sign(data);

    const result = {
      id: data,
      accessToken,
    };

    res.status(sc.OK).send(success(sc.OK, rm.SIGNIN_SUCCESS, result));
  } catch (e) {
    console.log(error);
    //? 서버 내부에서 오류 발생
    res.status(sc.INTERNAL_SERVER_ERROR).send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};


//* GET ~/api/user/?keyword=hi
//* 이름으로 유저 조회
const searchUserByName = async (req: Request, res: Response) => {
  const { keyword, option } = req.query;

  const data = await userService.searchUserByName(keyword as string, option as string);

  if (!data) {
    res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SEARCH_USER_FAIL))
  }

  return res.status(sc.OK).send(success(sc.OK, rm.SEARCH_USER_SUCCESS, data))
};

const userController = {
  getUserById,
  updateUser,
  deleteUser,
  getAllUser,
  createUser,
  signInUser,
  searchUserByName
};

export default userController;