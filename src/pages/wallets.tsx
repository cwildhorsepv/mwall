import Layout from "../components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import WalletWizard from "../components/WalletWizard";

export default function Wallets() {
    const [wallets, setWallets] = useState<any[]>([]);
    const [showWizard, setShowWizard] = useState(false);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("wallets") || "[]");
        setWallets(stored);
    }, [showWizard]); // refresh list after wizard closes

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    My Wallets
                </h1>
                <button
                    onClick={() => setShowWizard(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded uv-glow-soft hover:bg-blue-700"
                >
                    + Create Wallet
                </button>
            </div>

            {wallets.length === 0 ? (
                <p className="text-gray-400">
                    No wallets yet. Create one to get started.
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {wallets.map((w) => (
                        <Link href={`/wallet?id=${w.id}`} key={w.id}>
                            <div className="uv-card uv-glow cursor-pointer hover:scale-105 transition">
                                <h2 className="text-xl font-semibold">
                                    {w.name}
                                </h2>
                                <p className="text-gray-300">
                                    Balance: {w.balance}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {w.managed
                                        ? "Merlin-assisted"
                                        : "Self-managed"}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {showWizard && (
                <WalletWizard onClose={() => setShowWizard(false)} />
            )}
        </Layout>
    );
}
