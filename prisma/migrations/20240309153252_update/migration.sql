-- AlterTable
ALTER TABLE "User" ADD COLUMN     "councilId" INTEGER,
ALTER COLUMN "role" SET DEFAULT 'User';

-- CreateTable
CREATE TABLE "Council" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Council_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_councilId_fkey" FOREIGN KEY ("councilId") REFERENCES "Council"("id") ON DELETE SET NULL ON UPDATE CASCADE;
