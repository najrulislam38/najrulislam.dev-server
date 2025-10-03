import express from "express";
import { ProjectController } from "./project.controller";
import { checkAuth } from "../../middleware/checkAuth";

const router = express.Router();

router.get("/", ProjectController.getAllProject);

router.post("/create", checkAuth("ADMIN"), ProjectController.createProject);

export const projectRoutes = router;
