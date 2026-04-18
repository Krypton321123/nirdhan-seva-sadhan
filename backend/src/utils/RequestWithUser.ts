import { Request } from "express";
import { adminInterface } from "../models/adminModel.js";
import { JwtPayload } from "jsonwebtoken";

export interface RequestWithAdmin extends Request {
    admin: adminInterface | string  | JwtPayload
} 