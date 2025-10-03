import AppError from "../../ErrorHelpers/AppError";
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

const getAllProjectFromDB = async () => {
  const projects = await Project.find();

  return projects;
};

export const ProjectServices = {
  createProjectFromDB,
  getAllProjectFromDB,
};
