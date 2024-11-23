import { Router } from "express";
import { getCampaign, getCampaigns, getCampaignsForLandingPage, getLatestCampaign } from "../controllers/campaignController.js";

const campaignRouter = Router(); 

campaignRouter.route('/getCampaignById/:id').get(getCampaign); 
campaignRouter.route('/getLatestCampaignForLandingPage').get(getCampaignsForLandingPage)
campaignRouter.route('/campaigns').get(getCampaigns)
campaignRouter.route('/getLatestCampaign').get(getLatestCampaign)

export default campaignRouter