// pages/api/wallets/[id]/categorize.ts
import { getSession } from "../../../../lib/session";
import { prisma } from "../../../../server/prisma";
import { requirePermission } from "../../../../lib/permissions";

export default async function handler(req: any, res: any) {
    const session = await getSession(req);
    if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

    const walletId = req.query.id as string;

    if (req.method !== "POST") return res.status(405).end();
    const has = await requirePermission(
        session.user.id,
        walletId,
        "CATEGORIZE",
    );
    if (!has) return res.status(403).json({ error: "Forbidden" });

    const { transactionId, category } = req.body;
    await prisma.transaction.update({
        where: { id: transactionId },
        data: { type: category },
    }); // or separate category field
    return res.json({ ok: true });
}
