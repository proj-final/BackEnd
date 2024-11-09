/*
  Warnings:

  - Added the required column `password` to the `DeliveryBoy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryBoy" ADD COLUMN     "password" TEXT NOT NULL;
