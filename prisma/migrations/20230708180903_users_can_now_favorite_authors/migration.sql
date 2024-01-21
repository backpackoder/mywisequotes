/*
  Warnings:

  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[englishName]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "favoritedById" TEXT[],
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "englishName" TEXT;

-- DropTable
DROP TABLE "Favorite";

-- CreateTable
CREATE TABLE "FavoriteQuote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,

    CONSTRAINT "FavoriteQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteAuthor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "FavoriteAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_updatedAuthors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AuthorToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteQuote_userId_quoteId_key" ON "FavoriteQuote"("userId", "quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteAuthor_userId_authorId_key" ON "FavoriteAuthor"("userId", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "_updatedAuthors_AB_unique" ON "_updatedAuthors"("A", "B");

-- CreateIndex
CREATE INDEX "_updatedAuthors_B_index" ON "_updatedAuthors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToUser_AB_unique" ON "_AuthorToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToUser_B_index" ON "_AuthorToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_englishName_key" ON "Tag"("englishName");

-- AddForeignKey
ALTER TABLE "FavoriteQuote" ADD CONSTRAINT "FavoriteQuote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteQuote" ADD CONSTRAINT "FavoriteQuote_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAuthor" ADD CONSTRAINT "FavoriteAuthor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAuthor" ADD CONSTRAINT "FavoriteAuthor_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_updatedAuthors" ADD CONSTRAINT "_updatedAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_updatedAuthors" ADD CONSTRAINT "_updatedAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToUser" ADD CONSTRAINT "_AuthorToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToUser" ADD CONSTRAINT "_AuthorToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
