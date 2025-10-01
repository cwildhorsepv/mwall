// src/lib/api.ts
type Wallet = {
    walletId: string;
    address: string;
    balance: string;
    transactions: { id: string; amount: string; type: string; date: string }[];
};

export async function getWallet(walletId: string): Promise<Wallet> {
    // mock data for now
    return {
        walletId,
        address: "0x1234abcd5678ef90",
        balance: "250.00 USDT",
        transactions: [
            {
                id: "txn1",
                amount: "+100.00 USDT",
                type: "credit",
                date: "2025-09-25",
            },
            {
                id: "txn2",
                amount: "-50.00 USDT",
                type: "debit",
                date: "2025-09-26",
            },
        ],
    };
}

export async function grantDelegate(walletId: string, delegateId: string) {
    return {
        walletId,
        delegateId,
        status: "active",
        grantedAt: new Date().toISOString(),
    };
}
