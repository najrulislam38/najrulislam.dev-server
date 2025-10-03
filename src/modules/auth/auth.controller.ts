import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const login = catchAsync(async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body?.password;
  const result = await AuthService.loginFromDB({ res, email, password });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login Successful",
    data: result,
  });
});

export const AuthController = {
  login,
};
