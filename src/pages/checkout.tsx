// src/pages/checkout.tsx
import Layout from "../components/Layout";
import { useState } from "react";
import { getWallet } from "../lib/api";

export default function Checkout() {
    const [status, setStatus] = useState<string | null>(null);

    // Mock cart: 1 item costing 75 USDT
    const cartTotal = 75.0;

    async function handleCheckout() {
        // Grab mock wallet (replace with API later)
        const wallet = await getWallet("demo-wallet-id");
        const balance = parseFloat(wallet.balance);

        if (balance >= cartTotal) {
            setStatus("success");
        } else {
            setStatus("insufficient");
        }
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">USDT Store Checkout</h1>

            <div className="uv-card uv-glow-soft max-w-md space-y-4">
                {/* Cart */}
                <div>
                    <h2 className="font-semibold text-lg">Cart</h2>
                    <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
                        <li>Demo Item (75.00 USDT)</li>
                    </ul>
                    <p className="mt-2 font-bold text-gray-900 dark:text-gray-100">
                        Total: {cartTotal.toFixed(2)} USDT
                    </p>
                </div>

                {/* Button */}
                <button
                    onClick={handleCheckout}
                    className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                >
                    Confirm Purchase
                </button>

                {/* Status messages */}
                {status === "success" && (
                    <div className="mt-4 p-4 rounded bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100">
                        ✅ Purchase successful! 75.00 USDT deducted from your
                        wallet.
                    </div>
                )}
                {status === "insufficient" && (
                    <div className="mt-4 p-4 rounded bg-red-100 dark:bg-red-800 text-red-900 dark:text-red-100">
                        ❌ Insufficient balance. Please add funds to your
                        wallet.
                    </div>
                )}
            </div>
        </Layout>
    );
}
