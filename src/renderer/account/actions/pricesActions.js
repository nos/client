import fetch from 'node-fetch';
import { createActions } from 'spunky';
import { reduce } from 'lodash';

function mapPrices(tickers, currency) {
  return reduce(tickers, (mapping, ticker) => ({
    ...mapping,
    [ticker.symbol]: parseFloat(ticker[`price_${currency.toLowerCase()}`])
  }), {});
}

async function getPrices(currency) {
  const url = `https://api.coinmarketcap.com/v1/ticker/?limit=0&convert=${currency.toLowerCase()}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return mapPrices(data, currency);
}

export const ID = 'prices';

export default createActions(ID, ({ currency = 'usd' }) => () => getPrices(currency));
