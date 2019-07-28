import { withProps } from 'recompose';
import { reduce } from 'lodash';

import TotalValue from './TotalValue';
import calculateTokenValue from '../../../../util/calculateTokenValue';

const mapTotalToProps = (props) => ({
  total: reduce(props.balances, (sum, token) => {
    return sum + calculateTokenValue(token, props.prices);
  }, 0.0)
});

export default withProps(mapTotalToProps)(TotalValue);
