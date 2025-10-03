// src/components/Navbar.tsx
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import useSWR from "swr";

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
    });

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { data: user, error, isLoading } = useSWR("/api/me", fetcher);

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900">
            <div className="flex gap-4 items-center">
                {user && (
                    <>
                        <Link href="/wallets">Wallets</Link>
                        <Link href="/delegate">Delegate</Link>
                        <Link href="/checkout">Checkout</Link>
                    </>
                )}
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="px-2 py-1 rounded bg-gray-300 dark:bg-gray-700"
                >
                    {theme === "dark" ? "☀️" : "🌙"}
                </button>

                {/* Show loading */}
                {isLoading && <span className="text-gray-500">Loading...</span>}

                {/* Show login if no user */}
                {!user && !isLoading && (
                    <Link
                        href="/api/auth/login"
                        className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                        Login / Sign Up
                    </Link>
                )}

                {/* Show logout if user */}
                {user && !error && (
                    <Link
                        href="/api/auth/logout"
                        className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                        Logout
                    </Link>
                )}
            </div>
        </nav>
    );
}
