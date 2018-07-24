import BigNumber from 'bignumber.js';
import { mapProps } from 'recompose';
import { map, omit, orderBy } from 'lodash';

import Breakdown from './Breakdown';

const calculateTokenValues = ({ balances, prices }) => map(balances, (token) => ({
  label: token.symbol,
  value: parseFloat(
    new BigNumber(token.balance).times(prices[token.symbol] || 0).toFixed(token.decimals),
    10
  )
}));

const mapBalancesToProps = (props) => ({
  ...omit(props, 'balances'),
  data: orderBy(calculateTokenValues(props), ['value'], ['desc'])
});

export default mapProps(mapBalancesToProps)(Breakdown);
