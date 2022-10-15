// src/api/blog.ts

import express, { Request, Response, Router } from "express";
// express 모듈에서 express, (request, response, router)-> 타입 정의를 위해 불러옴!

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const blog = {
    title: "동재의 일상 끄적끄적",
    content: "오늘은 알고리즘 문제를 풀었다. 보람찬 하루였음",
    date: "2022-10-13",
  };
  return res.status(200).json({
    status: 200,
    message: "블로그 조회 성공",
    data: blog,
  });
});

module.exports = router;