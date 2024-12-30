import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {FormSubmissionInterface, formSubmissionModel} from "../models/formModel.js";
import {ApiError} from "../utils/apiError.js";
import { Request, Response } from 'express'
import {fileURLToPath} from "url";
import path from "path";
import dotenv from "dotenv";
import {v2 as cloudinary} from 'cloudinary'
import fs from "fs";

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const submitFormController = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, address, dob, purpose, generatedId } = req.body;
    const file = req.file;


    if (!name || !email || !phone || !address || !dob || !purpose || !generatedId || !file) {
        return res.status(400).json(new ApiError(400, "All fields are required."));
    }

    if (file) {
        console.log("File recieved: ", file.path)

        const imagePath = path.join(__dirname, "../../uploads", file.filename);
        console.log("File to upload: ", imagePath);

        if (!fs.existsSync(imagePath)) {
            console.error("File not found at path:", imagePath);
            return res.status(400).json(new ApiError(400, "Image file not found"));
        }


        console.log("Uploading image to Cloudinary...");
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "campaign_images",
        });
        console.log("Image uploaded to Cloudinary:", result.secure_url);
        const imageUrl = result.secure_url;

        const existingForm = await formSubmissionModel.findOne({ email, phone });
        if (existingForm) {
            return res.status(400).json(new ApiError(400, "A form with this email already exists."));
        }

        // Save form data
        const newForm = new formSubmissionModel({
            name,
            email,
            phone,
            dob,
            address,
            purpose,
            generatedId,
            userImageURL: imageUrl,
        });

        await newForm.save();



        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting the file:", err);
            } else {
                console.log("Local file deleted successfully");
            }
        });

        return res.status(201).json(new ApiResponse(201, newForm, "Form submitted successfully."));
    } else{
        console.log("file not recieved");
        return res.status(400).json(new ApiError(400, "Not able to find the file"));
    }

});

export const getFormStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const form = await formSubmissionModel.findOne<FormSubmissionInterface>({ generatedId: id });

        if (!form) {
            return res.status(401).json(new ApiError(401, "No form found"));
        }

        const { isApproved, imageURL } = form;

        return res.status(200).json(new ApiResponse(200, {isApproved, imageURL}, "Form is found"));

    } catch(err) {

    }
})