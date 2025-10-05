import { deleteImageFromCloudinary } from "../../config/cloudinary.config";
import AppError from "../../ErrorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { projectSearchableFields } from "./project.constant";
import { IProject } from "./project.interface";
import { Project } from "./project.modal";
import httpStatus from "http-status-codes";

const createProjectFromDB = async (payload: IProject) => {
  const isExist = await Project.findOne({ title: payload?.title });

  if (isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "This Project Already existed");
  }

  const project = await Project.create(payload);

  return project;
};

const getAllProjectFromDB = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Project.find(), query);

  const projects = queryBuilder
    .search(projectSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    projects.build().populate("owner", "name email picture age"),
    queryBuilder.getMeta(),
  ]);

  return {
    meta,
    data,
  };
};

const getProjectFromDB = async (slug: string) => {
  const project = await Project.findOne({ slug }).populate(
    "owner",
    "name email picture age"
  );

  if (!project) {
    throw new AppError(httpStatus.BAD_REQUEST, "Project not found!");
  }

  project.views = project?.views + 1;
  project.save();

  return project;
};

const updateProjectFromDB = async (
  slug: string,
  payload: Partial<IProject>
) => {
  const project = await Project.findOne({ slug });

  if (!project) {
    throw new AppError(httpStatus.BAD_REQUEST, "Project not found!");
  }

  if (
    payload.images &&
    payload.images.length > 0 &&
    project.images &&
    project.images.length > 0
  ) {
    payload.images = [...payload.images, ...project.images];
  }

  if (
    payload.deleteImages &&
    payload.deleteImages.length > 0 &&
    project.images &&
    project.images.length > 0
  ) {
    const resetDBImages = project.images?.filter(
      (imageUrl) => !payload.deleteImages?.includes(imageUrl)
    );

    const updatedPayloadImages = (payload.images || [])
      ?.filter((imageUrl) => !payload.deleteImages?.includes(imageUrl))
      .filter((imageUrl) => !resetDBImages?.includes(imageUrl));

    payload.images = [...resetDBImages, ...updatedPayloadImages];
  }

  const updatedProject = await Project.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  }).populate("owner", "name email picture age");

  if (
    payload.deleteImages &&
    payload.deleteImages.length > 0 &&
    project.images &&
    project.images.length > 0
  ) {
    await Promise.all(
      payload.deleteImages.map((url) => deleteImageFromCloudinary(url))
    );
  }

  return updatedProject;
};

const deleteProjectFromDB = async (slug: string) => {
  const project = await Project.findOneAndDelete({ slug });

  if (!project) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Project not found!. Maybe project already deleted"
    );
  }

  return project;
};

export const ProjectServices = {
  createProjectFromDB,
  getAllProjectFromDB,
  getProjectFromDB,
  updateProjectFromDB,
  deleteProjectFromDB,
};
