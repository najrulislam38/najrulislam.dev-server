/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ProjectServices } from "./project.service";
import httpStatus from "http-status-codes";

const createProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = {
      ...req.body,
      thumbnail: (req.files as Express.Multer.File[])[0]?.path,
      images: (req.files as Express.Multer.File[])?.map((file) => file?.path),
    };
    const result = await ProjectServices.createProjectFromDB(payload);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Project Created Successfully.",
      data: result,
    });
  }
);

const getAllProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await ProjectServices.getAllProjectFromDB(
      query as Record<string, string>
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Projects Retrieved Successfully.",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug as string;
    const result = await ProjectServices.getProjectFromDB(slug);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project Retrieved Successfully.",
      data: result,
    });
  }
);

const updateProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug as string;
    const result = await ProjectServices.updateProjectFromDB(slug, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project Updated Successfully.",
      data: result,
    });
  }
);

const deleteProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug as string;
    const result = await ProjectServices.deleteProjectFromDB(slug);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project Deleted Successfully.",
      data: null,
    });
  }
);

export const ProjectController = {
  createProject,
  getAllProject,
  getSingleProject,
  updateProject,
  deleteProject,
};
