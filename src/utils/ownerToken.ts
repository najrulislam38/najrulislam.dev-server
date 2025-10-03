import { envVariables } from "../config/env";
import { IOwner } from "../modules/owner/owner.interfase";
import { generateToken } from "./jwt";

export const createUserTokens = (owner: Partial<IOwner>) => {
  const jwtPayload = {
    ownerId: owner._id,
    email: owner.email,
    role: owner.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    envVariables.JWT_ACCESS_SECRET,
    envVariables.JWT_ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVariables.JWT_REFRESH_SECRET,
    envVariables.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};
