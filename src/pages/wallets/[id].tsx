// src/pages/wallets/[id].tsx
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/Layout";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function WalletDetail() {
    const router = useRouter();
    const { id } = router.query;

    // Only run SWR when id is available
    const { data: wallet, error } = useSWR(
        id ? `/api/wallets/${id}` : null,
        fetcher,
    );

    if (error) {
        return (
            <Layout>
                <p className="text-red-500">Error loading wallet</p>
            </Layout>
        );
    }

    if (!wallet) {
        return (
            <Layout>
                <p>Loading...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="text-xl font-bold">{wallet.name}</h1>
            <p>Balance: ${wallet.balance}</p>
            <h2 className="mt-4 font-semibold">Transactions</h2>
            <ul>
                {wallet.transactions.map((tx: any) => (
                    <li key={tx.id}>
                        {tx.type}: ${tx.amount} on{" "}
                        {new Date(tx.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </Layout>
    );
}
