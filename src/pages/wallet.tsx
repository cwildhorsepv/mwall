import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { getWallet } from '../lib/api';

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
        <div className="p-4 border rounded shadow">
          <p><strong>ID:</strong> {wallet.walletId}</p>
          <p><strong>Address:</strong> {wallet.address}</p>
          <p><strong>Balance:</strong> {wallet.balance}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}
