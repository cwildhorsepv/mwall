import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-blue-500">Welcome to mwall</h1>
        <p className="mt-4 text-lg text-gray-600">Your Proof of Concept Wallet-as-a-Service</p>
      </div>
    </Layout>
  );
}
