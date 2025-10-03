// src/pages/checkout.tsx
import Layout from "../components/Layout";
import { useState } from "react";
import useSWR from "swr";
import { mutate } from "swr";
import type { GetServerSideProps } from "next";
import { getSession } from "../../src/lib/session";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const { data: user, error } = useSWR("/api/me", fetcher, {
    refreshInterval: 5000, // every 5s
});

function Checkout() {
    const [status, setStatus] = useState<string | null>(null);
    const [updatedWallet, setUpdatedWallet] = useState<any>(null);
    const { data: user, error } = useSWR("/api/me", fetcher);

    const cartTotal = 75.0;

    async function handleCheckout() {
        if (!user || !user.wallets?.length) {
            setStatus("no-wallet");
            return;
        }

        const walletId = user.wallets[0].id;

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ walletId, amount: cartTotal }),
            });

            const data = await res.json();

            if (res.ok) {
                setUpdatedWallet(data.wallet);
                setStatus("success");
                // 🔄 Revalidate the /api/me cache so profile + other components update
                mutate("/api/me");
            } else if (data.error === "Insufficient funds") {
                setStatus("insufficient");
            } else {
                setStatus("error");
            }
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    }

    if (error) {
        return (
            <Layout>
                <p className="text-red-500">
                    Error loading user: {error.message}
                </p>
            </Layout>
        );
    }

    if (!user) {
        return (
            <Layout>
                <p className="text-gray-500">Loading...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">USDT Store Checkout</h1>
            <p>
                Charging <strong>${cartTotal}</strong> to wallet:{" "}
                {user.wallets[0]?.name || "—"}
            </p>
            <button
                onClick={handleCheckout}
                className="uv-card uv-glow p-3 rounded mt-4"
            >
                Confirm Purchase
            </button>

            {status === "success" && (
                <div className="mt-4 text-green-500">
                    <p>✅ Success! Purchase complete.</p>
                    <p>
                        New balance:{" "}
                        <strong>
                            {updatedWallet?.balance?.toFixed(2) || "—"}
                        </strong>
                    </p>
                </div>
            )}
            {status === "insufficient" && (
                <p className="mt-4 text-red-500">❌ Insufficient funds.</p>
            )}
            {status === "no-wallet" && (
                <p className="mt-4 text-yellow-500">⚠️ No wallet available.</p>
            )}
            {status === "error" && (
                <p className="mt-4 text-red-500">⚠️ Something went wrong.</p>
            )}
        </Layout>
    );
}

// SSR protection with Neon session
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession(req as any);
    if (!session) {
        return { redirect: { destination: "/", permanent: false } };
    }
    return { props: {} };
};

export default Checkout;
