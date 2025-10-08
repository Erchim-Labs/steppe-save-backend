-- CreateEnum
CREATE TYPE "public"."ROLES" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."GROWTH_STAGES" AS ENUM ('STAGE_1', 'STAGE_2', 'STAGE_3', 'STAGE_4');

-- CreateEnum
CREATE TYPE "public"."ACCOUNT_TYPE" AS ENUM ('LOCKED_TERM', 'FLEXIBLE_TERM', 'AUTO_INVESTMENT_TERM');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "prefix" TEXT NOT NULL DEFAULT '976',
    "telNumber" TEXT,
    "password" TEXT NOT NULL,
    "nickName" TEXT,
    "email" TEXT NOT NULL,
    "role" "public"."ROLES" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Roundup" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "target_amount" INTEGER NOT NULL DEFAULT 0,
    "current_amount" INTEGER NOT NULL DEFAULT 0,
    "account_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Roundup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserAccountInfo" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "user_id" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "account_type" TEXT NOT NULL DEFAULT 'savings',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAccountInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tree" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "roundup_id" TEXT NOT NULL,
    "name" TEXT,
    "growth_percentage" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "from_user_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "to_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telNumber_key" ON "public"."User"("telNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Roundup" ADD CONSTRAINT "Roundup_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Roundup" ADD CONSTRAINT "Roundup_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "public"."UserAccountInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAccountInfo" ADD CONSTRAINT "UserAccountInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tree" ADD CONSTRAINT "Tree_roundup_id_fkey" FOREIGN KEY ("roundup_id") REFERENCES "public"."Roundup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
