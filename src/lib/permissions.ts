// src/lib/permissions.ts
import { prisma } from "../server/prisma";

export async function requirePermission(
    userId: string,
    walletId: string,
    action: string,
) {
    // owner always allowed
    const wallet = await prisma.wallet.findUnique({ where: { id: walletId } });
    if (wallet?.userId === userId) return true;

    const allowed = await prisma.permission.findFirst({
        where: {
            action,
            delegate: { walletId, userId },
            OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        },
    });
    return Boolean(allowed);
}
