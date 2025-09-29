import express, { Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status-codes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { OwnerRouter } from "./modules/owner/owner.route";
import { authRouter } from "./modules/auth/auth.route";

const app = express();

//middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173/"], credentials: true }));

app.use("/api/v1/owner", OwnerRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Najrul Islam Developer P. Server.",
  });
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
