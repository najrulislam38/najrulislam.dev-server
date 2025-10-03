import { NextFunction, Request, Response } from "express";
import AppError from "../ErrorHelpers/AppError";
import { verifiedToken } from "../utils/jwt";
import { envVariables } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { Owner } from "../modules/owner/owner.model";
import httpStatus from "http-status-codes";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken =
        (await req.headers.authorization) || req.cookies.accessToken;

      if (!accessToken) {
        throw new AppError(403, "No token retrieve");
      }

      const verifiedToked = verifiedToken(
        accessToken,
        envVariables.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const isOwnerExist = await Owner.findOne({
        email: verifiedToked.email,
      });

      if (!isOwnerExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Owner email not exist.");
      }

      if (!authRoles.includes(verifiedToked.role)) {
        throw new AppError(404, "You are not permitted to view this route");
      }

      req.owner = verifiedToked;

      next();
    } catch (error) {
      next(error);
    }
  };
