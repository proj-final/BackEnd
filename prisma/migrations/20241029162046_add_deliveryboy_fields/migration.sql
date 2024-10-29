/*
  Warnings:

  - Added the required column `email` to the `DeliveryBoy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `DeliveryBoy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryBoy" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;
