// exceptionHandler.middleware.ts
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/responses";

const exceptionHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {

    if (err && typeof err.statusCode === "number") {
        // <---- This is the key change ---->
        return res.status(err.statusCode).json(new ApiResponse(err.statusCode, null, err.message));
    }

    res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
};

export { exceptionHandler };
