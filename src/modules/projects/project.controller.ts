/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ProjectServices } from "./project.service";

const createProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await ProjectServices.createProjectFromDB(req.body);

    sendResponse(res, {
      statusCode: 400,
      success: true,
      message: "Project Created Successfully.",
      data: result,
    });
  }
);

export const ProjectController = {
  createProject,
};
