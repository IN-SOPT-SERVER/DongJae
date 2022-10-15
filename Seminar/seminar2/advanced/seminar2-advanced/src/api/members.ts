// src/api/members.ts

import express, { Request, Response, Router } from "express";
import {Member} from '../interfaces/member';

const router: Router = express.Router();


router.get("/", (req: Request, res: Response) => {
    const members: Member[] = [
        {
            name: "전선희",
            age: 23,
            home: "개봉",
            like: "피자"
        },
        {
            name: "김소현",
            age: 23,
            home: "상도",
            like: "방탈출"
        },
        {
            name: "김경린",
            age: 24,
            home: "일산",
            like: "산책"
        }
    ];
    return res.status(200).json({
        status: 200,
        message: "같은줄 멤버 조회 성공",
        data: members
    });
});

module.exports = router;