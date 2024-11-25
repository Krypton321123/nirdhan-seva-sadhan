import { Router } from "express";
import { addGalleryImageController, adminCreateBlogController, adminCreateCampaignController, adminLoginController, verifyUser } from "../controllers/adminController.js";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";
import { uploadCampaignImage } from "../middlewares/multer.middleware.js";

const adminRouter = Router(); 

adminRouter.route(`/login`).post(adminLoginController)
adminRouter.route(`/create-blog`).post(adminAuthMiddleware, uploadCampaignImage, adminCreateBlogController); 
adminRouter.route(`/verify-user`).post(adminAuthMiddleware, verifyUser); 
adminRouter.route(`/create-campaign`).post(adminAuthMiddleware, uploadCampaignImage, adminCreateCampaignController); 
adminRouter.route('/create-gallery-image').post(adminAuthMiddleware, uploadCampaignImage, addGalleryImageController)

export { adminRouter }