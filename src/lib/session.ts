import { prisma } from "../server/prisma";
import { randomUUID } from "crypto";
import { serialize, parse } from "cookie";

const SESSION_COOKIE = "mwall_session";

export async function createSession(userId: string, tokens: any, res: any) {
    const sessionId = randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    await prisma.session.create({
        data: {
            id: sessionId,
            userId,
            expiresAt,
            accessToken: tokens.access_token,
            idToken: tokens.id_token,
            refreshToken: tokens.refresh_token,
        },
    });

    res.setHeader(
        "Set-Cookie",
        serialize(SESSION_COOKIE, sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
        }),
    );
}

export async function getSession(req: any) {
    const cookies = parse(req.headers.cookie || "");
    const sessionId = cookies[SESSION_COOKIE];
    if (!sessionId) return null;

    return prisma.session.findUnique({
        where: { id: sessionId },
        include: { user: true },
    });
}

export async function destroySession(req: any, res: any) {
    const cookies = parse(req.headers.cookie || "");
    const sessionId = cookies[SESSION_COOKIE];
    if (sessionId) {
        await prisma.session.delete({ where: { id: sessionId } });
    }

    res.setHeader(
        "Set-Cookie",
        serialize(SESSION_COOKIE, "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            expires: new Date(0),
        }),
    );
}
