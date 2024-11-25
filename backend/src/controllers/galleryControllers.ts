import { Request, Response } from "express";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { galleryModel } from "../models/galleryModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getGalleryData = asyncHandler(async (req: Request, res: Response) => {
  try {

    const galleryData = await galleryModel.find().sort({ date: -1 }).lean();

    if (!galleryData || galleryData.length === 0) {
      return res.status(404).json(new ApiError(404, "No gallery images found"));
    }


    const formattedGalleryData = galleryData.map((item) => ({
      imageURL: item.imageURL, 
      description: item.description,
      date: item.date 
    ? new Date(item.date).toLocaleDateString("en-GB")
    : "N/A", // Format date to DD-MM-YYYY
    }));

    
    return res.status(200).json(
      new ApiResponse(200, formattedGalleryData, "Gallery data fetched successfully")
    );
  } catch (error: any) {
    console.error("Error fetching gallery data:", error);
    return res
      .status(500)
      .json(new ApiError(500, "An error occurred while fetching gallery data"));
  }
});

export { getGalleryData };
