import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { campaignModel } from '../models/campaignModels.js';
import { asyncHandler } from '../utils/asyncHandler.js';


const getCampaign = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
        console.log("Int the get")
      // Validate the ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(new ApiError(400, 'Invalid Campaign ID'));
      }
  
      // Fetch the campaign
      const campaign = await campaignModel.findById(id).populate('createdBy', 'name email');
  
      // Handle campaign not found
      if (!campaign) {
        return res.status(404).json(new ApiError(404, 'Campaign not found'));
      }
  
      // Return the campaign details
      return res.status(200).json(new ApiResponse(200, campaign, "Campaign fetched successfully"));
    } catch (error) {
      // Handle unexpected errors
      return res.status(500).json(new ApiError(500, 'An error occurred while fetching the campaign'));
    }
  }); 

  const getCampaignsForLandingPage = asyncHandler(async (req: Request, res: Response) => {

    console.log("yaha par aa gaye")

    try {
        const latestCampaigns = await campaignModel
          .find({})
          .sort({ createdAt: -1 })
          .limit(3);
  
        if (latestCampaigns.length === 0) {
          // If no campaigns exist, return an appropriate response
          return res
            .status(404)
            .json(new ApiError(404, "No campaigns found"));
        }
        
        console.log(latestCampaigns)
        // Success response with the latest campaigns
        return res
          .status(200)
          .json(new ApiResponse(200, latestCampaigns, "Latest campaigns fetched successfully"));
      } catch (error) {
        console.error("Error fetching latest campaigns:", error);
  
        // Internal server error response
        return res
          .status(500)
          .json(new ApiError(500, "Internal Server Error"));
      }
    })

    const getCampaigns = asyncHandler( async (req: Request, res: Response) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;
      
        try {
          const campaigns = await campaignModel.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
      
          const totalCampaigns = await campaignModel.countDocuments();
          const totalPages = Math.ceil(totalCampaigns / limit);
      
          const response = new ApiResponse(200, {
            campaigns,
            pagination: {
              totalCampaigns,
              totalPages,
              currentPage: page,
              hasNextPage: page < totalPages,
              hasPreviousPage: page > 1,
            },
          });
      
          return res.status(200).json(response);
        } catch (error: any) {
          return res.status(500).json(new ApiError(500, "Error fetching campaigns", error));
        }
      });

      const getLatestCampaign = asyncHandler(async (req: Request, res: Response) => {
        try {
          const latestCampaign = await campaignModel.findOne().sort({ createdAt: -1 }).exec();
      
          if (!latestCampaign) {
            return res.status(404).json(
              new ApiError(404, "No campaigns found")
            );
          }
      
          res.status(200).json(
            new ApiResponse(200, latestCampaign, "Latest campaign fetched successfully")
          );
        } catch (err) {
          console.error(err);
          res.status(500).json(
            new ApiError(500, "Failed to fetch the latest campaign")
          );
        }
      });
export { getCampaign, getCampaignsForLandingPage, getCampaigns, getLatestCampaign }
