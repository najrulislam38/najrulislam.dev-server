import express from "express";
import { ProjectController } from "./project.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { createProjectZodSchema } from "./project.validation";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.get("/", ProjectController.getAllProject);

router.post(
  "/create",
  checkAuth("ADMIN"),
  multerUpload.array("files"),
  validateRequest(createProjectZodSchema),
  ProjectController.createProject
);

router.get("/:slug", ProjectController.getSingleProject);
router.patch("/:slug", checkAuth("ADMIN"), ProjectController.updateProject);
router.delete("/:slug", checkAuth("ADMIN"), ProjectController.deleteProject);

export const projectRoutes = router;
