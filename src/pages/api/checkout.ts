// pages/api/checkout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../src/server/prisma";
import { getSession } from "../../src/lib/session";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { walletId, amount } = JSON.parse(req.body);

        const wallet = await prisma.wallet.findUnique({
            where: { id: walletId },
        });
        if (!wallet || wallet.userId !== session.userId) {
            return res.status(403).json({ error: "Not your wallet" });
        }

        if (wallet.balance < amount) {
            return res.status(400).json({ error: "Insufficient funds" });
        }

        const [updatedWallet, transaction] = await prisma.$transaction([
            prisma.wallet.update({
                where: { id: walletId },
                data: { balance: { decrement: amount } },
            }),
            prisma.transaction.create({
                data: {
                    walletId,
                    amount,
                    type: "debit",
                },
            }),
        ]);

        res.json({
            success: true,
            wallet: updatedWallet,
            transaction,
        });
    } catch (err: any) {
        console.error("Checkout error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
