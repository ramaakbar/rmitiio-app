import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  // const cookies = req.cookies;

  // if (!cookies?.refreshToken)
  //   return res.status(401).json({ message: "Unauthorized, no refresh token" });

  const authHeader =
    req.headers.authorization || (req.headers.Authorization as string);

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (err: any, decoded: any) => {
      if (err) return res.status(403).json({ message: "Access Token Expired" });
      req.user = decoded.user;
      next();
    }
  );
};

export default verifyJWT;
