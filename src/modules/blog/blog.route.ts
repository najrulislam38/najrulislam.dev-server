import express from "express";
import { BlogController } from "./blog.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middleware/validateRequest";
import { createBlogZodSchema } from "./blog.validation";

const router = express.Router();

router.get("/", BlogController.getAllBlog);

router.post(
  "/create",
  checkAuth("ADMIN"),
  // multerUpload.fields([
  //   { name: "file", maxCount: 1 },
  //   { name: "files", maxCount: 10 },
  // ]),
  multerUpload.array("files"),
  validateRequest(createBlogZodSchema),
  BlogController.create
);

router.get("/:slug", BlogController.getBlog);

router.patch("/:slug", checkAuth("ADMIN"), BlogController.updateBlog);

router.delete("/:slug", checkAuth("ADMIN"), BlogController.deleteBlog);

export const blogRouter = router;
