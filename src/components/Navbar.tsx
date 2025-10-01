import Link from "next/link";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "next/router";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    function handleCreate() {
        // Redirect to homepage and trigger wizard via query param
        router.push("/?wizard=true");
    }

    return (
        <nav className="bg-white/80 dark:bg-black/40 backdrop-blur p-4 flex justify-between items-center border-b border-gray-200 dark:border-white/10">
            {/* Left side links */}
            <div className="flex gap-6 font-semibold items-center">
                <Link href="/wallets">Wallets</Link>
                <Link href="/delegate">Delegate</Link>
                <Link href="/checkout">Checkout</Link>

                {/* Create Wallet button */}
                <button
                    onClick={handleCreate}
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm uv-glow-soft"
                >
                    + Create Wallet
                </button>
            </div>

            {/* Right side: theme toggle */}
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white text-sm"
                >
                    {theme === "dark" ? "☀ Light" : "🌙 Dark"}
                </button>
            </div>
        </nav>
    );
}
