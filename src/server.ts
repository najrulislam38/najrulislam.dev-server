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

process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection detected. Server shutting down.", error);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected. Server shuting down.", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("Sigterm signal received. Server shutting down");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("Ctrl + c press, Sigint signal received. Server shutting down");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
