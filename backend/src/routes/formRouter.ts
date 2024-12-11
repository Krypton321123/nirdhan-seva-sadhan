import { Router } from "express";
import {submitFormController} from "../controllers/formController.js";

const formRouter = Router();

formRouter.route('/submit').post(submitFormController)

export default formRouter;