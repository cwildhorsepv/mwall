// src/pages/wallets/index.tsx
import Layout from "../../components/Layout";
import Link from "next/link";
import useSWR from "swr";
import type { GetServerSideProps } from "next"; // ✅ type import
import { getSession } from "../../lib/session";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Wallets() {
  const { data: wallets, error } = useSWR("/api/wallets", fetcher);

  if (error) {
    return (
      <Layout>
        <p className="text-red-500">Error loading wallets: {error.message}</p>
      </Layout>
    );
  }

  if (!wallets) {
    return (
      <Layout>
        <p className="text-gray-500">Loading wallets...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">My Wallets</h1>
      {wallets.length === 0 ? (
        <p className="text-gray-500">
          No wallets yet. Use “+ Create Wallet” to start.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {wallets.map((w: any) => (
            <Link href={`/wallets/${w.id}`} key={w.id}>
              <div className="uv-card uv-glow cursor-pointer hover:scale-105 transition">
                <h2 className="text-xl font-semibold">{w.name}</h2>
                <p className="text-gray-300">Balance: {w.balance}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
}

// SSR guard with Neon session
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession(req as any);
  if (!session) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: {} };
};

export default Wallets;
