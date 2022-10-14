// src/api/comment.ts

import express, { Request, Response, Router } from "express";
// express 모듈에서 express, (request, response, router)-> 타입 정의를 위해 불러옴!

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const comment ={
    content: "오늘도 파이팅입니다^^",
    date: "2022-10-14",
  }
  return res.status(200).json({
    status: 200,
    message: "댓글 조회 성공",
    data: comment,
  });
});

module.exports = router;