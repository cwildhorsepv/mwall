// src/pages/api/auth/callback.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/prisma";
import { createSession } from "../../../lib/session";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: "Missing code from Auth0" });
    }

    try {
        // Exchange code for tokens
        const tokenRes = await fetch(
            `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    grant_type: "authorization_code",
                    client_id: process.env.AUTH0_CLIENT_ID,
                    client_secret: process.env.AUTH0_CLIENT_SECRET,
                    code,
                    redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
                }),
            },
        );

        const tokens = await tokenRes.json();
        console.log("Auth0 token response:", tokens);

        if (!tokens.id_token) {
            return res
                .status(400)
                .json({ error: "No id_token returned from Auth0" });
        }

        // Decode ID token (JWT)
        const base64Payload = tokens.id_token.split(".")[1];
        const decoded = JSON.parse(
            Buffer.from(base64Payload, "base64").toString(),
        );

        let { sub, email, name } = decoded;

        // Fallback: fetch /userinfo if needed
        if (!sub || !email) {
            const userInfoRes = await fetch(
                `${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`,
                {
                    headers: { Authorization: `Bearer ${tokens.access_token}` },
                },
            );
            const userInfo = await userInfoRes.json();
            sub = userInfo.sub;
            email = userInfo.email;
            name = userInfo.name;
        }

        if (!sub || !email) {
            return res.status(400).json({ error: "Missing Auth0 user info" });
        }

        // Upsert user in Neon
        const user = await prisma.user.upsert({
            where: { auth0Id: sub },
            update: { email, name },
            create: { auth0Id: sub, email, name },
        });

        // Create Neon session + cookie
        await createSession(user.id, tokens, res);

        // Redirect back to profile page
        res.redirect("/profile");
    } catch (err) {
        console.error("Callback error:", err);
        res.status(500).json({ error: "Auth callback failed" });
    }
}
