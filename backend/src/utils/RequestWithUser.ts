import { Request } from "express";
import { adminInterface } from "../models/adminModel";

export interface RequestWithAdmin extends Request {
    admin: adminInterface 
} 