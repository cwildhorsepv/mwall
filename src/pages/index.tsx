import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import WalletWizard from "../components/WalletWizard";

export default function Home() {
    const [showWizard, setShowWizard] = useState(false);
    const router = useRouter();

    // Open wizard if ?wizard=true
    useEffect(() => {
        if (router.query.wizard === "true") {
            setShowWizard(true);
        }
    }, [router.query]);

    return (
        <Layout>
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
                <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Meet Merlin Wallet
                </h1>
                <p className="max-w-2xl text-lg text-gray-300 mb-8">
                    Automagically powered by AI and blockchain — create wallets
                    that follow your rules, so your money manages itself.
                </p>
                <button
                    onClick={() => setShowWizard(true)}
                    className="uv-btn uv-btn-primary uv-glow-strong"
                >
                    ✨ Create Wallet
                </button>
            </section>

            {showWizard && (
                <WalletWizard onClose={() => setShowWizard(false)} />
            )}
        </Layout>
    );
}
