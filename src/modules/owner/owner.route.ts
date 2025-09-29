import express from "express";
import { OwnerController } from "./owner.controller";

const router = express.Router();

router.post("/create", OwnerController.createOwner);

export const OwnerRouter = router;
