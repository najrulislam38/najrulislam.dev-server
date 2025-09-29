import AppError from "../../ErrorHelpers/AppError";
import { IOwner } from "./owner.interfase";
import { Owner } from "./owner.model";
import bcryptjs from "bcryptjs";

const createOwnerFromDB = async (payload: Partial<IOwner>) => {
  const { email, password, ...rest } = payload;

  const isOwnerExist = await Owner.findOne({ email });

  if (isOwnerExist) {
    throw new AppError(400, "This Owner Already Exit");
  }

  const hashPass = await bcryptjs.hash(password as string, 8);

  const owner = await Owner.create({
    email,
    password: hashPass,
    ...rest,
  });

  return owner;
};

export const OwnerService = {
  createOwnerFromDB,
};
