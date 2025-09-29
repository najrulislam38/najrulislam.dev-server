import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { OwnerService } from "./owner.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createOwner = catchAsync(async (req: Request, res: Response) => {
  const payload = { ...req.body };

  const result = await OwnerService.createOwnerFromDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Owner Created Successful",
    data: result,
  });
});

export const OwnerController = {
  createOwner,
};
