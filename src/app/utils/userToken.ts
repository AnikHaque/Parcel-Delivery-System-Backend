import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";
import { envVars } from "../config/env";

// Only require the needed fields from IUser
type MinimalUser = Pick<IUser, "_id" | "email" | "role">;

export const crateToken = (user: MinimalUser) => {
  const jsonPayload = {
    userId: user._id,
    userEmail: user.email,
    userRole: user.role
  };

  const accessToken = jwt.sign(
    jsonPayload,
    envVars.JWT_ACCESS_SECRET,
    { expiresIn: envVars.JWT_REFRESH_EXPIRES } as SignOptions
  );

  return {
    accessToken,
  };
};
