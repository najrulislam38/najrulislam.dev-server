/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from "../../ErrorHelpers/AppError";
import { Owner } from "../owner/owner.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createUserTokens } from "../../utils/ownerToken";
import { setAuthCookie } from "../../utils/setCookie";
import { Response } from "express";

const loginFromDB = async ({
  res,
  email,
  password,
}: {
  res: Response;
  email: string;
  password: string;
}) => {
  const isOwnerExist = await Owner.findOne({ email });

  if (!isOwnerExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Owner Not found !");
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isOwnerExist.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password didn't matched.");
  }

  const ownerTokens = await createUserTokens(isOwnerExist);

  setAuthCookie(res, ownerTokens);

  const { password: pass, ...rest } = isOwnerExist.toObject();

  return {
    accessToken: ownerTokens.accessToken,
    refreshToken: ownerTokens.refreshToken,
    name: rest?.name,
    email: rest?.email,
  };
};

export const AuthService = {
  loginFromDB,
};
