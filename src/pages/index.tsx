// src/pages/index.tsx
import Layout from "../components/Layout";
import Link from "next/link";

export default function Landing() {
    return (
        <Layout>
            <section className="flex flex-col items-center justify-center text-center py-20">
                <h1 className="text-5xl font-bold mb-6">Merlin Wallet</h1>
                <p className="text-xl mb-10 max-w-xl">
                    A simple, secure wallet for testing and building the future
                    of Federated Value.
                </p>
                <Link
                    href="/wallets"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                    Enter Wallet
                </Link>
            </section>
        </Layout>
    );
}
