import { withProps } from 'recompose';
import { map } from 'lodash';

import BreakdownChart from './BreakdownChart';
import calculateTokenValue from '../../../../../util/calculateTokenValue';

const calculateTokenValues = ({ balances, prices }) =>
  map(balances, (token) => ({
    label: token.symbol,
    value: calculateTokenValue(token, prices)
  }));

const mapBalancesToProps = (props) => ({
  data: calculateTokenValues(props),
  threshold: 0.03
});

export default withProps(mapBalancesToProps)(BreakdownChart);
