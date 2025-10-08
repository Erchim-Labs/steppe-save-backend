/*
  Warnings:

  - You are about to drop the column `nickName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `prefix` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `telNumber` on the `User` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."User_telNumber_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "nickName",
DROP COLUMN "password",
DROP COLUMN "prefix",
DROP COLUMN "telNumber",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "first_name_en" TEXT,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "last_name_en" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL;
