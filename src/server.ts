/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "http";
import { envVariables } from "./config/env";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const startServer = async () => {
  try {
    const mongoUrl = envVariables.DB_URL;
    const port = envVariables.PORT;
    if (!mongoUrl) {
      throw new Error("DB_URL environment variable is missing");
    }

    await mongoose.connect(mongoUrl);

    console.log("MongoDB is connected.");

    server = app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
