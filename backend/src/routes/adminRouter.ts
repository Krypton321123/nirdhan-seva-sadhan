import { Router } from "express";
import { adminLoginController } from "../controllers/adminController.js";

const adminRouter = Router(); 

adminRouter.route(`/login`).post(adminLoginController)

export { adminRouter }