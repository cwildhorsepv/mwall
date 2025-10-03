/*
  Warnings:

  - A unique constraint covering the columns `[walletId,userId]` on the table `Delegate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Delegate_walletId_userId_key" ON "Delegate"("walletId", "userId");
