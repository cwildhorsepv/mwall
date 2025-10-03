// src/pages/api/auth/logout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { destroySession } from "../../../lib/session";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        // destroy Neon session + clear cookie
        await destroySession(req, res);

        // Also redirect to Auth0 logout (optional but good practice)
        const returnTo = `${process.env.AUTH0_BASE_URL}/`;
        const logoutUrl = new URL(
            `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout`,
        );
        logoutUrl.searchParams.set("client_id", process.env.AUTH0_CLIENT_ID!);
        logoutUrl.searchParams.set("returnTo", returnTo);

        res.redirect(logoutUrl.toString());
    } catch (err: any) {
        console.error("Logout error:", err);
        res.status(500).json({ error: "Logout failed" });
    }
}
