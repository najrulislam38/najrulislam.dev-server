/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { IErrorSources, IGenericErrorResponse } from "../types/error.types";

export const handleValidateError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errorSources: IErrorSources[] = [];

  const errors = Object.values(err.errors);

  errors.forEach((errorObject: any) => {
    errorSources.push({
      path: errorObject.path,
      message: errorObject.message,
    });
  });

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};
