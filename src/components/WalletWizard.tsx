// src/components/WalletWizard.tsx
import { useState } from "react";
import { useRouter } from "next/router";

export default function WalletWizard({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(0);
    const [walletName, setWalletName] = useState("");
    const [managed, setManaged] = useState<boolean | null>(null);
    const router = useRouter();

    function finish() {
        // Simulate wallet creation
        const newWallet = {
            id: Date.now().toString(),
            name: walletName || "Unnamed Wallet",
            managed,
            balance: "0.00 USDT",
        };

        // Save to localStorage for now (later → NeonDB or API)
        const existing = JSON.parse(localStorage.getItem("wallets") || "[]");
        localStorage.setItem(
            "wallets",
            JSON.stringify([...existing, newWallet]),
        );

        // Close wizard + go to wallet list
        onClose();
        router.push("/wallets");
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="uv-card uv-glow-strong w-full max-w-lg p-6 space-y-6">
                {/* Step 1: Name Wallet */}
                {step === 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            🪄 Name Your Wallet
                        </h2>
                        <input
                            type="text"
                            value={walletName}
                            onChange={(e) => setWalletName(e.target.value)}
                            placeholder="e.g. Travel Fund"
                            className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
                        />
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setStep(1)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Managed or Self-Managed */}
                {step === 1 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            ✨ Wallet Management
                        </h2>
                        <p className="text-gray-300 mb-6">
                            Do you want Merlin to help manage your wallet with
                            rules?
                        </p>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => {
                                    setManaged(true);
                                    setStep(2);
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Yes, manage it for me
                            </button>
                            <button
                                onClick={() => {
                                    setManaged(false);
                                    setStep(2);
                                }}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            >
                                No, I’ll manage it myself
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Finish */}
                {step === 2 && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            🎉 Wallet Ready!
                        </h2>
                        <p className="text-gray-300 mb-6">
                            Wallet{" "}
                            <strong>{walletName || "Unnamed Wallet"}</strong>{" "}
                            created.
                        </p>
                        <p className="text-gray-400">
                            Management:{" "}
                            {managed ? "Merlin-assisted" : "Self-managed"}
                        </p>
                        <button
                            onClick={finish}
                            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                        >
                            Go to Wallets
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
