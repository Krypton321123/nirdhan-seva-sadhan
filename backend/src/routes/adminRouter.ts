import { Router } from "express";
import { adminCreateBlogController, adminCreateCampaignController, adminLoginController, verifyUser } from "../controllers/adminController.js";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";
import { uploadCampaignImage } from "../middlewares/multer.middleware.js";

const adminRouter = Router(); 

adminRouter.route(`/login`).post(adminLoginController)
adminRouter.route(`/create-blog`).post(adminAuthMiddleware, uploadCampaignImage, adminCreateBlogController); 
adminRouter.route(`/verify-user`).post(adminAuthMiddleware, verifyUser); 
adminRouter.route(`/create-campaign`).post(adminAuthMiddleware, uploadCampaignImage, adminCreateCampaignController); 

export { adminRouter }