// src/pages/delegate.tsx
import Layout from "../components/Layout";
import { useState } from "react";
import { grantDelegate } from "../lib/api";

export default function Delegate() {
    const [status, setStatus] = useState<any>(null);

    async function handleGrant() {
        const result = await grantDelegate(
            "demo-wallet-id",
            "federated_value_delegate",
        );
        setStatus(result);
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Delegate Permission</h1>

            <div className="uv-card uv-glow-soft max-w-md space-y-4">
                <p className="text-gray-700 dark:text-gray-200">
                    Grant the Federated Value delegate permission to manage your
                    wallet.
                </p>

                <button
                    onClick={handleGrant}
                    className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                >
                    Grant Delegate
                </button>

                {status && (
                    <div className="mt-4 p-4 rounded bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100">
                        <p>
                            <strong>Delegate:</strong> {status.delegateId}
                        </p>
                        <p>
                            <strong>Status:</strong> {status.status}
                        </p>
                        <p>
                            <strong>Granted At:</strong> {status.grantedAt}
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
