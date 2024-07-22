/*
  Warnings:

  - You are about to drop the column `status` on the `book_issue` table. All the data in the column will be lost.
  - Added the required column `status_id` to the `book_issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "book_issue" DROP COLUMN "status",
ADD COLUMN     "status_id" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "book_issue_status";

-- CreateTable
CREATE TABLE "book_issue_status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "book_issue_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_issue_status_status_key" ON "book_issue_status"("status");

-- AddForeignKey
ALTER TABLE "book_issue" ADD CONSTRAINT "book_issue_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "book_issue_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
