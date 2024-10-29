/*
  Warnings:

  - Made the column `imageUrl` on table `DeliveryBoy` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `DeliveryBoy` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DeliveryBoy" ADD COLUMN     "cardId" TEXT[],
ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
