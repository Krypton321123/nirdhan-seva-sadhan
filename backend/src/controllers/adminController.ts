import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isEmpty } from "../utils/isEmpty.js";
import { Request, Response } from "express";
import { Admin } from "../models/adminModel.js";
import { adminInterface } from "../models/adminModel.js";

const adminLoginController = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body; 

    if(isEmpty(username) || isEmpty(password)) {
        return res.status(400).json(new ApiError(400, "Empty username or password")); 
    }

    try{
        const existingUser = await Admin.findOne<adminInterface>({username: username})

        if(!existingUser) {
            return res.status(409).json(new ApiError(409, "User not found"))
        }

        if (existingUser.password !== password) {
            return res.status(409).json(new ApiError(409, "Password not matched"))
        }

        return res.status(200).json(new ApiResponse(200, existingUser, "Admin Logged In"))

    } catch(err: any) {
        console.log(err)
        return res.status(500).json(new ApiError(500, "Internal Server Error"))
    }
})

export { adminLoginController }