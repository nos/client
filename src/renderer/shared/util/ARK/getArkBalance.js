const ARK_API = 'https://api.ark.io/api';

export default async function getArkBalance({ address }) {
  const url = `${ARK_API}/wallets/${address}`;
  const response = await fetch(url);
  const { data } = await response.json();
  const { balance } = data;
  const number = Number((parseFloat(balance, 10) / 1e8).toFixed(8)).toString();
  return {
    ARK: { name: 'ARK', symbol: 'ARK', scriptHash: 'ARK', decimals: 8, balance: number }
  };
}
