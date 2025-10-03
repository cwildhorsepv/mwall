// src/pages/_app.tsx
import { Auth0Provider } from "@auth0/nextjs-auth0";
import { ThemeProvider } from "../context/ThemeContext";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/brand.css";
import "../styles/glow.css";

export default function App({ Component, pageProps }: AppProps) {
    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
    const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;
    const redirectUri =
        typeof window !== "undefined"
            ? window.location.origin + "/wallets"
            : undefined;

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{ redirect_uri: redirectUri }}
        >
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </Auth0Provider>
    );
}
