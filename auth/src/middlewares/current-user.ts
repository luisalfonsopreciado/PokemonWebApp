import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, UserDoc} from "../models/user";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserDoc;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next();
  }

  const token = req.headers?.authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    const user = await User.findById(payload.id)
    req.currentUser = user?.tokens.includes(token) ? user: undefined;
  } catch (err) {}
  next();
};
