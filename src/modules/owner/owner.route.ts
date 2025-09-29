import express from "express";
import { OwnerController } from "./owner.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createOwnerZodSchema } from "./owner.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(createOwnerZodSchema),
  OwnerController.createOwner
);

export const OwnerRouter = router;
