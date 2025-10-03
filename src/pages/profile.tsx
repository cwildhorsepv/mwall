// src/pages/profile.tsx
import Layout from "../components/Layout";
import useSWR from "swr";
import { GetServerSideProps } from "next";
import { getSession } from "../../src/lib/session";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Profile() {
    const { data: user, error } = useSWR("/api/me", fetcher);

    if (error) {
        return (
            <Layout>
                <p className="text-red-500">
                    Error loading profile: {error.message}
                </p>
            </Layout>
        );
    }

    if (!user) {
        return (
            <Layout>
                <p className="text-gray-500">Loading profile...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <div className="uv-card uv-glow-soft p-6 max-w-lg mx-auto space-y-4">
                <p>
                    <strong>ID:</strong> {user.id}
                </p>
                <p>
                    <strong>Name:</strong> {user.name || "—"}
                </p>
                <p>
                    <strong>Email:</strong> {user.email || "—"}
                </p>
                <p>
                    <strong>Wallets:</strong> {user.wallets?.length || 0}
                </p>
            </div>

            {user.wallets?.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">My Wallets</h2>
                    <ul className="grid gap-4 md:grid-cols-2">
                        {user.wallets.map((w: any) => (
                            <li
                                key={w.id}
                                className="uv-card uv-glow cursor-pointer p-4 rounded shadow"
                            >
                                <h3 className="text-lg font-semibold">
                                    {w.name}
                                </h3>
                                <p>Balance: {w.balance}</p>
                                <p className="text-xs text-gray-400">
                                    ID: {w.id}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Layout>
    );
}

// Protect with Neon session, not Auth0
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession(req as any);
    if (!session) {
        return { redirect: { destination: "/", permanent: false } };
    }
    return { props: {} };
};

export default Profile;
