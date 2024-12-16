import { Router } from "express";
import {
    addGalleryImageController,
    adminCreateBlogController,
    adminCreateCampaignController,
    adminDeleteBlog,
    adminDeleteCampaign, adminDeleteGalleryItem,
    adminGetBlogs,
    adminGetCampaigns,
    adminGetGallery,
    adminLoginController,
    approveForm,
    getFormController,
    verifyUser
} from "../controllers/adminController.js";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";
import { uploadCampaignImage } from "../middlewares/multer.middleware.js";

const adminRouter = Router(); 

adminRouter.route(`/login`).post(adminLoginController)
adminRouter.route(`/create-blog`).post(adminAuthMiddleware, uploadCampaignImage, adminCreateBlogController); 
adminRouter.route(`/verify-user`).post(adminAuthMiddleware, verifyUser); 
adminRouter.route(`/create-campaign`).post(adminAuthMiddleware, uploadCampaignImage, adminCreateCampaignController); 
adminRouter.route('/create-gallery-image').post(adminAuthMiddleware, uploadCampaignImage, addGalleryImageController)
adminRouter.route('/get-forms').get(adminAuthMiddleware, getFormController);
adminRouter.route('/approve-form/:id').patch(adminAuthMiddleware, approveForm);
adminRouter.route('/get-campaigns').get(adminAuthMiddleware, adminGetCampaigns);
adminRouter.route('/delete-campaign/:id').delete(adminAuthMiddleware, adminDeleteCampaign)
adminRouter.route('/get-blogs').get(adminAuthMiddleware, adminGetBlogs);
adminRouter.route('/delete-blog/:id').delete(adminAuthMiddleware, adminDeleteBlog);
adminRouter.route('/get-gallery').get(adminAuthMiddleware, adminGetGallery);
adminRouter.route('/delete-gallery-item/:id').delete(adminAuthMiddleware, adminDeleteGalleryItem);

export { adminRouter }