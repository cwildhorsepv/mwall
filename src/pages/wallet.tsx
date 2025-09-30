// src/pages/wallet.tsx
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
            <h1 className="text-2xl font-bold mb-4">Wallet Dashboard</h1>
            {wallet ? (
                <div className="space-y-6">
                    <div className="p-4 border rounded shadow bg-white">
                        <p>
                            <strong>ID:</strong> {wallet.walletId}
                        </p>
                        <p>
                            <strong>Address:</strong> {wallet.address}
                        </p>
                        <p>
                            <strong>Balance:</strong> {wallet.balance}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Transactions
                        </h2>
                        <ul className="divide-y">
                            {wallet.transactions.map((txn: any) => (
                                <li
                                    key={txn.id}
                                    className="py-2 flex justify-between"
                                >
                                    <span>{txn.date}</span>
                                    <span>{txn.type}</span>
                                    <span>{txn.amount}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading mock wallet...</p>
            )}
        </Layout>
    );
}
