/*
  Warnings:

  - You are about to drop the column `uid` on the `Reaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uId,postId]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uId` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_uid_fkey";

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "uid",
ADD COLUMN     "uId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_uId_postId_key" ON "Reaction"("uId", "postId");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_uId_fkey" FOREIGN KEY ("uId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
