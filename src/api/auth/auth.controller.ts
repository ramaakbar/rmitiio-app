import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import jwt, { Secret } from "jsonwebtoken";
import { LoginInput, RegisterInput } from "./auth.schema";
import { Prisma } from "@prisma/client";

// $desc Register New User
// @route POST /auth/register
// @access Public
export async function registerHandler(
  req: Request<{}, {}, RegisterInput["body"]>,
  res: Response
) {
  try {
    const { email, username, password } = req.body;

    const hashPass = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_WORK_FACTOR as string)
    );

    const createdUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashPass,
      },
      select: {
        id: true,
        username: true,
        email: true,
        picture: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({ createdUser });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        error: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}

// $desc Login User
// @route POST /auth
// @access Public
export async function loginHandler(
  req: Request<{}, {}, LoginInput["body"]>,
  res: Response
) {
  try {
    const { email, password } = req.body;

    const foundUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!foundUser)
      return res.status(401).json({ message: "Unauthorized, email not found" });

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch)
      return res
        .status(401)
        .json({ message: "Unauthorized, wrong credentials" });

    const accessToken = jwt.sign(
      { user: foundUser },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      { expiresIn: process.env.ACCESS_TOKEN_Ttl } // 10 sec ntar klo udh kelar ganti jadi 15m
    );

    const refreshToken = jwt.sign(
      { user: foundUser },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      { expiresIn: process.env.REFRESH_TOKEN_Ttl }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      // secure: true,
      sameSite: "none",
      // maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match rT
      maxAge: parseInt(process.env.MAX_AGE_COOKIES_IN_MS as string), // cookie expiry: set to match rT
    });

    res.json({ accessToken });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}

// $desc Refresh - get access token with refresh token
// @route GET /auth/refresh
// @access Public
export async function refreshHandler(req: Request, res: Response) {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as Secret,
      async (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        const foundUser = await prisma.user.findFirst({
          where: {
            email: decoded.user.email,
          },
        });

        if (!foundUser)
          return res
            .status(401)
            .json({ message: "Unauthorized, email not found" });

        const accessToken = jwt.sign(
          { user: foundUser },
          process.env.ACCESS_TOKEN_SECRET as Secret,
          { expiresIn: process.env.ACCESS_TOKEN_Ttl } // 10 sec ntar klo udh kelar ganti jadi 15m
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}

// $desc Logout - clears cookies
// @route POST /auth/logout
// @access Public
export async function logoutHandler(req: Request, res: Response) {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // no content

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

  res.json({ message: "Cookies cleared" });
}
