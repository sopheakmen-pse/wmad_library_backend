/*
  Warnings:

  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Author";

-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bio" TEXT,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);
