import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { getWallet } from "../lib/api";

export default function Wallet() {
    const [wallet, setWallet] = useState<any>(null);

    useEffect(() => {
        async function fetchWallet() {
            const data = await getWallet("demo-wallet-id");
            setWallet(data);
        }
        fetchWallet();
    }, []);

    return (
        <Layout>
            <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Wallet Dashboard
            </h1>

            {wallet ? (
                <div className="space-y-6">
                    {/* Wallet details card */}
                    <div className="uv-card uv-glow-soft">
                        <p>
                            <span className="text-gray-400">ID:</span>{" "}
                            {wallet.walletId}
                        </p>
                        <p>
                            <span className="text-gray-400">Address:</span>{" "}
                            {wallet.address}
                        </p>
                        <p>
                            <span className="text-gray-400">Balance:</span>{" "}
                            {wallet.balance}
                        </p>
                    </div>

                    {/* Transactions card */}
                    <div className="uv-card uv-glow">
                        <h2 className="text-xl font-semibold mb-2">
                            Transactions
                        </h2>
                        <ul className="divide-y divide-gray-700">
                            {wallet.transactions.map((txn: any) => (
                                <li
                                    key={txn.id}
                                    className="py-2 flex justify-between text-sm"
                                >
                                    <span className="text-gray-400">
                                        {txn.date}
                                    </span>
                                    <span>{txn.type}</span>
                                    <span
                                        className={
                                            txn.type === "credit"
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }
                                    >
                                        {txn.amount}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="text-gray-400">Loading mock wallet...</p>
            )}
        </Layout>
    );
}
