/*
  Warnings:

  - You are about to drop the column `address` on the `Council` table. All the data in the column will be lost.
  - Added the required column `city` to the `Council` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Council` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Council" DROP COLUMN "address",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
