import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import bcrypt from "bcrypt";
import {
  GetUserByIdInput,
  GetUserByUsernameInput,
  GetUsersWithQuery,
  UpdateUserByIdInput,
} from "./user.schema";

export async function getUsersHandler(
  req: Request<{}, {}, {}, GetUsersWithQuery["query"]>,
  res: Response
) {
  const searchUsername = req.query.username;
  const limit = parseInt(req.query.limit as string) || 10;
  const cursor = parseInt(req.query.cursor as string) || null;

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        username: true,
        email: true,
        picture: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        username: {
          contains: searchUsername,
        },
      },
      skip: cursor ? 1 : undefined,
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
    });

    res.status(200).json({
      pagination: {
        nextCursor: users[limit - 1]?.id ?? "",
      },
      data: users,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}

export async function getUserByIdHandler(
  req: Request<GetUserByIdInput["params"]>,
  res: Response
) {
  try {
    const userId = parseInt(req.params.userId);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        picture: true,
        createdAt: true,
        updatedAt: true,
        // posts: {
        //   orderBy: {
        //     createdAt: "desc",
        //   },
        // },
      },
    });

    if (!user) return res.status(404).json({ message: "user not found" });

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}

export async function updateUserByIdHandler(
  req: Request<UpdateUserByIdInput["params"], {}, UpdateUserByIdInput["body"]>,
  res: Response
) {
  try {
    const loggedUser = req.user;
    const userId = parseInt(req.params.userId);
    const body = req.body;

    const userToUpdate = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userToUpdate)
      return res.status(404).json({ message: "Error Could not find user" });

    if (userToUpdate.id !== loggedUser.id)
      return res
        .status(403)
        .json({ message: "Error, Unauthorized user request" });

    let hashPass;
    if (body?.password) {
      hashPass = await bcrypt.hash(
        body.password,
        parseInt(process.env.SALT_WORK_FACTOR as string)
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: body.username || undefined,
        password: hashPass || undefined,
        picture: body.picture || undefined,
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

    res.status(200).json({
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}

export async function getUserByUsernameHandler(
  req: Request<GetUserByUsernameInput["params"]>,
  res: Response
) {
  try {
    const username = req.params.username;
    const user = await prisma.user.findFirst({
      where: {
        username: username,
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

    if (!user) return res.status(404).json({ message: "user not found" });

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}
