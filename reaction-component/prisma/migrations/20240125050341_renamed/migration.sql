/*
  Warnings:

  - You are about to drop the column `uId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `uId` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `typeDetails` on the `ReactionEmoji` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emojiString` to the `ReactionEmoji` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_uId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_uId_fkey";

-- DropIndex
DROP INDEX "Reaction_uId_postId_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "uId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "uId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ReactionEmoji" DROP COLUMN "typeDetails",
ADD COLUMN     "emojiString" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_userId_postId_key" ON "Reaction"("userId", "postId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
