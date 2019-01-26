import { createActions } from 'spunky';
import { reduce } from 'lodash';
import CoinGecko from 'coingecko-api';

import getBalances from 'shared/util/getBalances';

const coinGeckoClient = new CoinGecko();

function mapPrices(tickers) {
  return reduce(
    tickers,
    (mapping, ticker) => ({
      ...mapping,
      [ticker.symbol.toUpperCase()]: ticker.current_price
    }),
    {}
  );
}

async function getBalanceWithPrices(currency, net, address) {
  const balances = await getBalances({ net, address });

  const coinListResult = await coinGeckoClient.coins.list();
  if (!coinListResult.success) {
    throw new Error(coinListResult.message);
  }

  const balancesArray = Object.keys(balances).map((key) => balances[key]);
  const ids = coinListResult.data.reduce((accum, coin) => {
    if (balancesArray.find((balance) => balance.name.toLowerCase() === coin.name.toLowerCase())) {
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

  const prices = mapPrices(coinPricesResult.data);
  return { balances, prices };
}

export const ID = 'balacewithprices';

export default createActions(ID, ({ currency, net, address }) => () => getBalanceWithPrices(currency, net, address));
