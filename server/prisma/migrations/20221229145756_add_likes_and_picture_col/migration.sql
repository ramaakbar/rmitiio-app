-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "picture" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "picture" TEXT;
