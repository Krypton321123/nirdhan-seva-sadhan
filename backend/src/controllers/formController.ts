import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {FormSubmissionInterface, formSubmissionModel} from "../models/formModel.js";
import {ApiError} from "../utils/apiError.js";
import { Request, Response } from 'express'

export const submitFormController = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, address, purpose, generatedId } = req.body;

    // Validate data
    if (!name || !email || !phone || !address || !purpose || !generatedId) {
        return res.status(400).json(new ApiError(400, "All fields are required."));
    }

    // Check for existing email
    const existingForm = await formSubmissionModel.findOne({ email });
    if (existingForm) {
        return res.status(400).json(new ApiError(400, "A form with this email already exists."));
    }

    // Save form data
    const newForm = new formSubmissionModel({
        name,
        email,
        phone,
        address,
        purpose,
        generatedId,
    });

    await newForm.save();

    return res.status(201).json(new ApiResponse(201, newForm, "Form submitted successfully."));
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