import { Request } from "express";
import { adminInterface } from "../models/adminModel";
import { JwtPayload } from "jsonwebtoken";

export interface RequestWithAdmin extends Request {
    admin: adminInterface | string  | JwtPayload
} 