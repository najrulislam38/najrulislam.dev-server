import AppError from "../../ErrorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { blogSearchableFields } from "./blog.constant";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.modal";
import httpStatus from "http-status-codes";

const createFromDB = async (payload: IBlog) => {
  const isExistBlog = await Blog.findOne({ title: payload.title });

  if (isExistBlog) {
    throw new AppError(httpStatus.BAD_REQUEST, "This Blog Already existed");
  }

  const blog = await Blog.create(payload);

  return blog;
};

const getAllBlogFromDB = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Blog.find(), query);

  const blogs = queryBuilder
    .search(blogSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    blogs.build().populate("author", "name email picture age"),
    queryBuilder.getMeta(),
  ]);

  return {
    meta,
    data,
  };
};

const getBlogFromDB = async (slug: string) => {
  const blog = await Blog.findOne({ slug });

  if (!blog) {
    throw new AppError(httpStatus.BAD_REQUEST, "Blog Not Found!");
  }

  blog.views = (blog?.views as number) + 1;

  blog.save();

  return blog;
};

const updateBlogFromDB = async ({
  slug,
  payload,
}: {
  slug: string;
  payload: Partial<IBlog>;
}) => {
  const isExistBlog = await Blog.findOne({ slug });

  if (!isExistBlog) {
    throw new AppError(httpStatus.BAD_REQUEST, "Blog Not Found!");
  }

  const updatedBlog = await Blog.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });

  return updatedBlog;
};

const deleteBlogFromDB = async (slug: string) => {
  const blog = await Blog.findOneAndDelete({ slug });

  return blog;
};

export const BlogService = {
  createFromDB,
  getAllBlogFromDB,
  getBlogFromDB,
  updateBlogFromDB,
  deleteBlogFromDB,
};
