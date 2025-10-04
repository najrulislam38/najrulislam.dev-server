/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BlogService } from "./blog.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.createFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog Created Successfully",
    data: result,
  });
});

const getAllBlog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await BlogService.getAllBlogFromDB(
      query as Record<string, string>
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Blogs Retrieved Successfully",
      meta: result?.meta,
      data: result.data,
    });
  }
);

const getBlog = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  const result = await BlogService.getBlogFromDB(slug);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog Retrieved Successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  const payload = req.body;
  const result = await BlogService.updateBlogFromDB({ slug, payload });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog Updated Successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug as string;

  const result = await BlogService.deleteBlogFromDB(slug);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog Deleted Successfully",
    data: null,
  });
});

export const BlogController = {
  create,
  getAllBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};
