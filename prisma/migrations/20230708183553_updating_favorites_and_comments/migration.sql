/*
  Warnings:

  - You are about to drop the `_CommentLikeTocommentReply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `commentReply` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `updatedAt` on table `Author` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_CommentLikeTocommentReply" DROP CONSTRAINT "_CommentLikeTocommentReply_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentLikeTocommentReply" DROP CONSTRAINT "_CommentLikeTocommentReply_B_fkey";

-- DropForeignKey
ALTER TABLE "commentReply" DROP CONSTRAINT "commentReply_commentId_fkey";

-- DropForeignKey
ALTER TABLE "commentReply" DROP CONSTRAINT "commentReply_userId_fkey";

-- DropIndex
DROP INDEX "Comment_userId_quoteId_key";

-- DropIndex
DROP INDEX "Language_nativeName_key";

-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Quote" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "_CommentLikeTocommentReply";

-- DropTable
DROP TABLE "commentReply";

-- CreateTable
CREATE TABLE "CommentReply" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "CommentReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommentLikeToCommentReply" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommentLikeToCommentReply_AB_unique" ON "_CommentLikeToCommentReply"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentLikeToCommentReply_B_index" ON "_CommentLikeToCommentReply"("B");

-- AddForeignKey
ALTER TABLE "CommentReply" ADD CONSTRAINT "CommentReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReply" ADD CONSTRAINT "CommentReply_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentLikeToCommentReply" ADD CONSTRAINT "_CommentLikeToCommentReply_A_fkey" FOREIGN KEY ("A") REFERENCES "CommentLike"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentLikeToCommentReply" ADD CONSTRAINT "_CommentLikeToCommentReply_B_fkey" FOREIGN KEY ("B") REFERENCES "CommentReply"("id") ON DELETE CASCADE ON UPDATE CASCADE;
