import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const MY_JWT_SECRET = process.env.JWT_SECRET;

export function authcheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!MY_JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "No token" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = parts[1];

    //@ts-ignore

    const decoded = jwt.verify(token, MY_JWT_SECRET);

    if (typeof decoded === "string" || !decoded.userId) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // ✅ attach safely
    (req as any).userId = decoded.userId;

    console.log("hiitt");

    next();

  } catch (error) {
    console.log("this is error :- ", error);
    return res.status(403).json({ message: "Invalid token" });
  }
}