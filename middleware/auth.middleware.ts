import jwt_decode from "jwt-decode";
import { NextFunction, Request, Response } from "express";
import { IAuth } from "../types/auth.interface";

export const authDecodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw Error("INVALID_TOKEN");
    }
    const tokenUsefulPart = token.replace("Bearer ", "");
    const decodedToken: IAuth = jwt_decode(tokenUsefulPart);
    const { exp, name, picture, email } = decodedToken;
    if (Date.now() >= exp * 1000) {
      throw Error("Expired_token");
    }
    Object.assign(req.body, { name, picture, email });
    next();
  } catch (error: any) {
    res.status(401).send({ success: false, message: "Unauthorized" });
  }
};
