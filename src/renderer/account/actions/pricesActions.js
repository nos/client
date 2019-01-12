import fetch from 'node-fetch';
import { createActions } from 'spunky';
import { reduce, map } from 'lodash';
import qs from 'qs';
import CoinGecko from 'coingecko-api';

const coinGeckoClient = new CoinGecko();

function mapPrices(tickers, currency) {
  return reduce(
    tickers,
    (mapping, ticker) => ({
      ...mapping,
      [ticker.symbol]: parseFloat(ticker[`price_${currency.toLowerCase()}`])
    }),
    {}
  );
}

async function getPrices(currency, balances) {
  const coinListResult = await coinGeckoClient.coins.list();
  if (!coinListResult.success) {
    throw new Error(coinListResult.message);
  }

  try {
    const balancesArray = Object.keys(balances).map((key) => balances[key]);
    const ids = coinListResult.data.reduce((accum, coin) => {
      if (balancesArray.find((balance) => balance.name.toLowerCase() === coin.name.toLowerCase())) {
        console.log(coin.id);
        accum.push(coin.id);
      }
      return accum;
    }, []);

    const coinPricesResult = await coinGeckoClient.coins.markets({
      vs_currency: currency.toLowerCase(),
      ids
    });
    if (!coinPricesResult.success) {
      throw new Error(coinPricesResult.message);
    }

    return mapPrices(coinPricesResult, currency);
  } catch (e) {
    console.log(e);
  }
}

export const ID = 'prices';

export default createActions(ID, ({ currency, balances }) => () => getPrices(currency, balances));
