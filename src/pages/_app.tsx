import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/brand.css";
import "../styles/glow.css";
import { ThemeProvider } from "../context/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
