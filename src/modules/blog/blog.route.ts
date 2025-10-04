import express from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../middleware/checkAuth";

const router = express.Router();

router.get("/", BlogController.getAllBlog);

router.post("/create", checkAuth("ADMIN"), BlogController.create);

router.get("/:slug", BlogController.getBlog);

router.patch("/:slug", checkAuth("ADMIN"), BlogController.updateBlog);

router.delete("/:slug", checkAuth("ADMIN"), BlogController.deleteBlog);

export const blogRouter = router;
