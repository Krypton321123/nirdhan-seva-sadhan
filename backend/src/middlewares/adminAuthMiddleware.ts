import { json, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";
import jsonwebtoken, { verify } from 'jsonwebtoken'
import { ApiError } from "../utils/apiError.js";
import { RequestWithAdmin } from "../utils/RequestWithUser.js";
import { adminInterface } from "../models/adminModel.js";

const adminAuthMiddleware = asyncHandler(async (req: RequestWithAdmin, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if (!authHeader) {
        return res.status(401).json(new ApiError(401, "Authorization token is missing"));
    }

    const token = authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json(new ApiError(401, "Token is missing from the Authorization header"));
    }

    try {
        
        const verifyToken = jsonwebtoken.verify(token, String(process.env.ADMIN_TOKEN_SECRET));
        req.admin = verifyToken;  

        next();  
    } catch (err) {
        console.log('Token verification failed:', err);
        return res.status(401).json(new ApiError(401, "Invalid or expired token"));
    }
})

export { adminAuthMiddleware }