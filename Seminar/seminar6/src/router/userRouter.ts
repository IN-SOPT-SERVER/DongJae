import { Router } from "express";
import userController from "../controller/userController";
import { auth } from "../middlewares";
const { body, validationResult } = require('express-validator');

const router: Router = Router();
// ! Router 만들 때, url depth가 긴 것 부터 위로 작성
// ? 이름으로 유저 검색 - GET api/user/?keyword=
router.get(
  "/search",
  userController.searchUserByName
);
//* 유저 생성 - POST api/user
router.post("/",
[body("name").notEmpty(), body("email").notEmpty(), body("password").isLength({ min: 6 })],
userController.createUser);

//* 특정 유저 조회
router.get("/:userId", userController.getUserById);

//* 전체 유저 조회 - GET api/user
router.get("/", userController.getAllUser);

// * 유저 정보 업데이트 - PATCH api/user/:userId
router.patch("/:userId", userController.updateUser);

// * 유저 삭제 - DELETE api/user/:userId
router.delete("/:userId", userController.deleteUser);

//* 로그인 - POST api/user/signin
router.post(
  "/signin",
  [
    body("email").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
    body("password").isLength({ min: 6 }),
  ],
  userController.signInUser
);

export default router;