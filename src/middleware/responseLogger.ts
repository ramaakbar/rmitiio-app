import { NextFunction, Request, Response } from "express";

const responseLogger = (req: Request, res: Response, next: NextFunction) => {
  res.on("finish", () => {
    console.log(
      `${req.socket.remoteAddress} - ${req.method} ${req.path} ${res.statusCode}`
    );
  });
  next();
};

export default responseLogger;
