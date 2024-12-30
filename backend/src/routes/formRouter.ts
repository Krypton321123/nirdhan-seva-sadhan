import { Router } from "express";
import {getFormStatus, submitFormController} from "../controllers/formController.js";
import {uploadCampaignImage} from "../middlewares/multer.middleware.js";

const formRouter = Router();

formRouter.route('/submit').post(uploadCampaignImage, submitFormController)
formRouter.route('/getForm/:id').get(getFormStatus);

export default formRouter;