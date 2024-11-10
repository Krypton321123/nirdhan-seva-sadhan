import { NextFunction, Request, Response } from "express"

const asyncHandler = (fnToExecute: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            fnToExecute(req, res, next)
        } catch (error: any) {
            res.status(error.code || 500).json({
                success: false,
                message: error.message
            })
        }
    }
}


export { asyncHandler }