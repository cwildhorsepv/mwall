-- CreateTable
CREATE TABLE "Delegate" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Delegate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "delegateId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "limit" DOUBLE PRECISION,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Delegate" ADD CONSTRAINT "Delegate_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delegate" ADD CONSTRAINT "Delegate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_delegateId_fkey" FOREIGN KEY ("delegateId") REFERENCES "Delegate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
