// src/pages/wallet/[id].tsx
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import useSWR from "swr";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function WalletDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { data: wallet, error } = useSWR(
        id ? `/api/wallets/${id}` : null,
        fetcher,
    );

    if (error) {
        return (
            <Layout>
                <p className="text-red-500">
                    Error loading wallet: {error.message}
                </p>
            </Layout>
        );
    }

    if (!wallet) {
        return (
            <Layout>
                <p className="text-gray-500">Loading wallet...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">{wallet.name}</h1>
            <div className="p-4 border rounded bg-white dark:bg-gray-900">
                <p>
                    <strong>Address:</strong> {wallet.address}
                </p>
                <p>
                    <strong>Balance:</strong> {wallet.balance} USDT
                </p>
            </div>
        </Layout>
    );
}

export default withPageAuthRequired(WalletDetail);
