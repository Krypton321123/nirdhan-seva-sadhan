import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isEmpty } from "../utils/isEmpty.js";
import { Request, Response } from "express";
import { adminModel } from "../models/adminModel.js";
import { adminInterface } from "../models/adminModel.js";
import { campaignModel, campaignSchemaInterface } from "../models/campaignModels.js";
import { RequestWithAdmin } from "../utils/RequestWithUser.js";

const adminLoginController = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body; 

    if(isEmpty(username) || isEmpty(password)) {
        return res.status(400).json(new ApiError(400, "Empty username or password")); 
    }

    try{
        const existingUser = await adminModel.findOne<adminInterface>({username: username})

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

const adminCreateCampaignController = asyncHandler(async (req: RequestWithAdmin, res: Response) => {
    const admin: adminInterface | any = req.admin; 
    try {

        const { campaignName, campaignGoal } = req.body; 

        if (isEmpty(campaignName) || isEmpty(campaignGoal)) {
            return res.status(406).json(new ApiError(406, "Input fields are empty"))
        } 

        const alreadyExistingCampaign = await campaignModel.findOne<campaignSchemaInterface>({
            name: campaignName
        }).exec(); 

        if (alreadyExistingCampaign) {
            return res.status(409).json(new ApiError(409, "Campaign Already exists")); 
        }

        const campaignCreating = new campaignModel({
            name: campaignName, 
            goal: campaignGoal, 
            createdBy: admin._id
        }); 

        await campaignCreating.save(); 

        return res.status(200).json(new ApiResponse(200, campaignCreating, "Campaign Created Successfully")); 

    } catch(error) {        
        console.log(error) 
        return res.status(500).json(new ApiError(500, "Internal Server Error"))
    }
})

// const adminCreateBlogController = asyncHandler(async (req: Request, res: Response) {

// })

export { adminLoginController, adminCreateCampaignController }