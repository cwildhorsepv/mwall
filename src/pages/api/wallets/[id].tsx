// src/pages/api/wallets/[id].ts
import { prisma } from "../../../server/prisma";
import { getSession } from "../../../lib/session";

export default async function handler(req: any, res: any) {
    try {
        const session = await getSession(req);
        if (!session || !session.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { id } = req.query;

        if (req.method === "GET") {
            const wallet = await prisma.wallet.findUnique({
                where: { id: id as string },
                include: { transactions: true },
            });

            if (!wallet || wallet.userId !== session.user.id) {
                return res.status(404).json({ error: "Wallet not found" });
            }

            return res.status(200).json(wallet);
        }

        if (req.method === "POST") {
            const { amount, type } = req.body;
            if (type !== "credit" && type !== "debit") {
                return res
                    .status(400)
                    .json({ error: "Invalid transaction type" });
            }

            const wallet = await prisma.wallet.update({
                where: { id: id as string },
                data: {
                    balance: {
                        increment: type === "credit" ? amount : -amount,
                    },
                    transactions: {
                        create: {
                            amount,
                            type,
                        },
                    },
                },
                include: { transactions: true },
            });

            return res.status(200).json(wallet);
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (err: any) {
        console.error("API /wallets/[id] error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}
