import { withProps } from 'recompose';
import { sortBy } from 'lodash';

import Breakdown from './Breakdown';
import calculateTokenValue from '../../../util/calculateTokenValue';

const mapSortedBalances = (props) => ({
  balances: sortBy(props.balances, (token) => -calculateTokenValue(token, props.prices))
});

export default withProps(mapSortedBalances)(Breakdown);
