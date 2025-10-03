// src/pages/delegate.tsx
import Layout from "../components/Layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

function Delegate() {
    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Delegate Management</h1>
            <p>
                This is where you will configure federated value delegates who
                can manage your wallet. Only authenticated users can view this
                page.
            </p>
        </Layout>
    );
}

export default withPageAuthRequired(Delegate);
