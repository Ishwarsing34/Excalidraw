import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import {JWT_SECRET} from '@repo/backend-common/config'
import {JWT_SECRET} from '@repo/backend-common/config'

export function authcheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token as string, JWT_SECRET as string);

    (req as any).user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}