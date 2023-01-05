import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import { randomImgName } from "../../utils/randomizePicName";
import { bucketName, bucketRegion, s3 } from "../../utils/s3Client";
import {
  CreateCommentInput,
  DeleteCommentInput,
  GetCommentsByPostIdInput,
  UpdateCommentInput,
} from "./comment.schema";

export async function getCommentsByPostIdHandler(
  req: Request<GetCommentsByPostIdInput["params"]>,
  res: Response
) {
  try {
    const limit = parseInt(req.query.limit as string) || 8;
    const cursor = parseInt(req.query.cursor as string) || null;
    const postId = parseInt(req.params.postId);

    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
      skip: cursor ? 1 : undefined,
      take: limit,
      cursor: cursor ? { id: cursor } : undefined,
    });

    res.status(200).json({
      pagination: {
        nextCursor: comments[limit - 1]?.id ?? undefined,
      },
      data: comments,
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

export async function createCommentHandler(
  req: Request<CreateCommentInput["params"], {}, CreateCommentInput["body"]>,
  res: Response
) {
  try {
    const user = req.user;
    const body = req.body;
    const file = req.file;
    const postId = parseInt(req.params.postId);

    const userPost = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!userPost)
      return res.status(404).json({ message: "Error, Could not find post" });

    const picExt = file?.originalname.split(".")[1];
    const newPicName = `${randomImgName()}.${picExt}`;
    const picUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${newPicName}`;

    if (file) {
      const pictureParams = {
        Bucket: bucketName,
        Key: newPicName,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const uploadPic = new PutObjectCommand(pictureParams);

      await s3.send(uploadPic);
    }

    const createdComment = await prisma.comment.create({
      data: {
        userId: user.id,
        postId: postId,
        content: body.content,
        picture: file ? picUrl : null,
      },
    });
    res.status(200).json({ data: createdComment });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}

export async function updateCommentHandler(
  req: Request<UpdateCommentInput["params"], {}, UpdateCommentInput["body"]>,
  res: Response
) {
  try {
    const user = req.user;
    const commentId = parseInt(req.params.commentId);
    const body = req.body;

    const userComment = await prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });

    if (!userComment)
      return res.status(404).json({ message: "Error, Could not find comment" });

    if (userComment.userId !== user.id)
      return res
        .status(403)
        .json({ message: "Error, Unauthorized user request" });

    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: body.content,
      },
    });
    res.status(200).json({ data: updatedComment });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}

export async function deleteCommentHandler(
  req: Request<DeleteCommentInput["params"], {}>,
  res: Response
) {
  try {
    const user = req.user;
    const commentId = parseInt(req.params.commentId);

    const userComment = await prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });

    if (!userComment)
      return res.status(404).json({ message: "Error, Could not find comment" });

    if (userComment.userId !== user.id)
      return res
        .status(403)
        .json({ message: "Error, Unauthorized user request" });

    const deleteComment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    res.status(200).json({ data: deleteComment });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "There was an error" });
  }
}
