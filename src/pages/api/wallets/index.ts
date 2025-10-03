// src/pages/api/wallets/index.ts
import { prisma } from "../../../server/prisma";
import { getSession } from "../../../lib/session";

export default async function handler(req: any, res: any) {
    try {
        const session = await getSession(req);
        if (!session || !session.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (req.method === "GET") {
            const wallets = await prisma.wallet.findMany({
                where: { userId: session.user.id },
            });
            return res.status(200).json(wallets);
        }

        if (req.method === "POST") {
            const { name, balance } = req.body;
            const wallet = await prisma.wallet.create({
                data: {
                    userId: session.user.id,
                    name,
                    balance: balance ?? 0,
                },
            });
            return res.status(201).json(wallet);
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (err: any) {
        console.error("API /wallets error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}
