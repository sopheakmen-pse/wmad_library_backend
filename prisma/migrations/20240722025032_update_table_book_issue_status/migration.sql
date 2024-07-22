/*
  Warnings:

  - The `status` column on the `book_issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "book_issue_status" AS ENUM ('issued', 'returned');

-- AlterTable
ALTER TABLE "book_issue" DROP COLUMN "status",
ADD COLUMN     "status" "book_issue_status" NOT NULL DEFAULT 'issued';
