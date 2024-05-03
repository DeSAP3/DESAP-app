/*
  Warnings:

  - The primary key for the `Analytics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Analytics` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `created` on the `Council` table. All the data in the column will be lost.
  - The primary key for the `DengueScreening` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `DengueScreening` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `createdBy` to the `Council` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "Analytics" DROP CONSTRAINT "Analytics_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Council" DROP COLUMN "created",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DengueScreening" DROP CONSTRAINT "DengueScreening_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "DengueScreening_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
