import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import {
  CreatePostInput,
  DeletePostInput,
  GetPostInput,
  GetPostsCursorPaginateQuery,
  GetPostsOffsetPaginateQuery,
  GetUserPostsInput,
  UpdatePostInput,
} from "./post.schema";

export async function getPostsHandler(
  req: Request<{}, {}, {}, GetPostsOffsetPaginateQuery["query"]>,
  res: Response
) {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const postsCount = await prisma.post.count();

    if (!postsCount) return res.status(200).json({ data: [] });

    const pageCount = Math.ceil(postsCount / limit);

    if (page > pageCount)
      return res.status(400).json({ message: "Error, bad request" });

    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      skip: limit * (page - 1),
      take: limit,
    });

    res.status(200).json({
      pagination: {
        total: postsCount,
        pageCount: pageCount,
        currentPage: page,
        perPage: limit,
        from: (page - 1) * limit + 1,
        to: (page - 1) * limit + posts.length,
      },
      data: posts,
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

export async function getPostsCursorHandler(
  req: Request<{}, {}, {}, GetPostsCursorPaginateQuery["query"]>,
  res: Response
) {
  try {
    const limit = parseInt(req.query.limit as string) || 8;
    const cursor = parseInt(req.query.cursor as string) || null;

    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      skip: cursor ? 1 : undefined,
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
    });

    res.status(200).json({
      pagination: {
        nextCursor: posts[limit - 1]?.id ?? undefined,
      },
      data: posts,
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

export async function createPostHandler(
  req: Request<{}, {}, CreatePostInput["body"]>,
  res: Response
) {
  try {
    const user = req.user;
    const body = req.body;

    const createdPost = await prisma.post.create({
      data: {
        userId: user.id,
        content: body.content,
      },
    });
    res.status(200).json({ data: createdPost });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}

export async function updatePostHandler(
  req: Request<UpdatePostInput["params"], {}, UpdatePostInput["body"]>,
  res: Response
) {
  try {
    const user = req.user;
    const postId = parseInt(req.params.postId);
    const body = req.body;

    const userPost = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!userPost)
      return res.status(404).json({ message: "Error, Could not find post" });

    if (userPost.userId !== user.id)
      return res
        .status(403)
        .json({ message: "Error, Unauthorized user request" });

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content: body.content,
      },
    });
    res.status(200).json({ data: updatedPost });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}

export async function deletePostHandler(
  req: Request<DeletePostInput["params"], {}>,
  res: Response
) {
  try {
    const user = req.user;
    const postId = parseInt(req.params.postId);

    const userPost = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!userPost)
      return res.status(404).json({ message: "Error, Could not find post" });

    if (userPost.userId !== user.id)
      return res
        .status(403)
        .json({ message: "Error, Unauthorized user request" });

    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.status(200).json({ data: deletePost });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}

export async function getPostHandler(
  req: Request<GetPostInput["params"]>,
  res: Response
) {
  try {
    const postId = parseInt(req.params.postId);

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ data: post });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}

// get user post

export async function getUserPostsHandler(
  req: Request<GetUserPostsInput["params"], {}, {}, GetUserPostsInput["query"]>,
  res: Response
) {
  try {
    const { username } = req.params;
    const limit = parseInt(req.query.limit as string) || 8;
    const cursor = parseInt(req.query.cursor as string) || null;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await prisma.post.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        userId: user?.id,
      },
      include: {
        user: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      skip: cursor ? 1 : undefined,
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
    });

    res.status(200).json({
      pagination: {
        nextCursor: posts[limit - 1]?.id ?? undefined,
      },
      data: posts ?? undefined,
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
