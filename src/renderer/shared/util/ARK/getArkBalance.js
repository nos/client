import getArkNetwork from './getNetwork';

export default async function getARKBalance({ address, coinType, net }) {
  const api = getArkNetwork({ coinType, net });
  const url = `${api}/wallets/${address}`;
  const response = await fetch(url);
  if (response.status === 404 || response.status === 429) {
    return {
      ARK: {
        name: 'ARK',
        symbol: 'ARK',
        scriptHash: 'ARK',
        decimals: 8,
        balance: '0'
      }
    };
  }

  const { data } = await response.json();
  const { balance } = data;
  const number = Number((parseFloat(balance, 10) / 1e8).toFixed(8)).toString();
  return {
    ARK: {
      name: 'ARK',
      symbol: 'ARK',
      scriptHash: 'ARK',
      decimals: 8,
      balance: number
    }
  };
}
