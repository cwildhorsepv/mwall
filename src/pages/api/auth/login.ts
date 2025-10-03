// src/pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const protocol = (req.headers["x-forwarded-proto"] as string) || "http";
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const redirectUri = `${baseUrl}/api/auth/callback`;

    const authUrl =
        `${process.env.AUTH0_ISSUER_BASE_URL}/authorize?` +
        new URLSearchParams({
            client_id: process.env.AUTH0_CLIENT_ID!,
            response_type: "code",
            redirect_uri: redirectUri,
            scope: "openid profile email offline_access",
        });

    console.log("Redirecting to Auth0:", authUrl);
    res.redirect(authUrl);
}
