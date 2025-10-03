// src/pages/home.tsx
import Layout from "../components/Layout";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function HomePage() {
    const { user, error, isLoading } = useUser();

    if (isLoading) {
        return (
            <Layout>
                <p>Loading...</p>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <p className="text-red-500">Error: {error.message}</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="flex flex-col items-center justify-center text-center py-20">
                <h1 className="text-4xl font-bold mb-6">
                    Merlin Wallet Dev Home
                </h1>
                {user ? (
                    <>
                        <p className="mb-4">
                            Welcome, {user.name || user.email}!
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="/wallets"
                                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                View Wallets
                            </Link>
                            <Link
                                href="/profile"
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Profile
                            </Link>
                            <Link
                                href="/api/auth/logout"
                                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Logout
                            </Link>
                        </div>
                    </>
                ) : (
                    <Link
                        href="/api/auth/login"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                    >
                        Login / Sign Up
                    </Link>
                )}
            </section>
        </Layout>
    );
}
