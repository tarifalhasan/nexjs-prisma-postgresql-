/*
  Warnings:

  - You are about to drop the column `complete` on the `Todo` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'IN_PROGRESS', 'CLOSE');

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "complete",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'OPEN';
