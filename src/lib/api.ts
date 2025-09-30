import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WAAS_API_URL || "http://localhost:4000/api/v1",
});

export async function getWallet(walletId: string) {
  const { data } = await api.get(`/wallets/${walletId}`);
  return data;
}
