import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

//middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173/"], credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Najrul Islam Developer P. Server.",
  });
});

export default app;
