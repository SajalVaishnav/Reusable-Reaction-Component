/*
  Warnings:

  - You are about to drop the column `uid` on the `Post` table. All the data in the column will be lost.
  - Added the required column `uId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_uid_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "uid",
ADD COLUMN     "uId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_uId_fkey" FOREIGN KEY ("uId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
