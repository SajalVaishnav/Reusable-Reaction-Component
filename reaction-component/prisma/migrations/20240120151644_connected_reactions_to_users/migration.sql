/*
  Warnings:

  - You are about to drop the column `username` on the `Reaction` table. All the data in the column will be lost.
  - Added the required column `uid` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "username",
ADD COLUMN     "uid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
