import { Router } from "express";
import {getFormStatus, submitFormController} from "../controllers/formController.js";

const formRouter = Router();

formRouter.route('/submit').post(submitFormController)
formRouter.route('/getForm/:id').get(getFormStatus);

export default formRouter;