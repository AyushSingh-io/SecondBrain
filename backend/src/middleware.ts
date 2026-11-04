import type { NextFunction, Request, Response } from "express";
import { UserModel } from "./db.js";
import jwt from "jsonwebtoken";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers["authorization"];
    let user;
    try {
        const userId = jwt.verify(token as string, process.env.JWTKEY as string);

        user = await UserModel.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "Invalid user credentials" })
        }

    } catch (error) {
        return res.status(400).json({ messaage: "Invalid token" });
    }

    //@ts-ignore
    req.user = user;
    next();
} 