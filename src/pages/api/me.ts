// pages/api/me.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/prisma";
import { getSession } from "../../lib/session";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const session = await getSession(req);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.userId },
            include: { wallets: true },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (err: any) {
        console.error("Error in /api/me:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
