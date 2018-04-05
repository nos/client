import { compose } from 'recompose';
import { withCall, withData, withProgressComponents, progressValues } from 'spunky';

import Home from './Home';
import Loading from '../Loading';
import authActions from '../../actions/authActions';
import balancesActions from '../../actions/balancesActions';

const { LOADING } = progressValues;

const mapAuthDataToProps = ({ address }) => ({ address });

const mapBalancesDataToProps = (balances) => ({ balances });

export default compose(
  withData(authActions, mapAuthDataToProps),
  withCall(balancesActions, ({ address }) => ({ address, net: 'TestNet' })),
  withProgressComponents(balancesActions, {
    [LOADING]: Loading
  }),
  withData(balancesActions, mapBalancesDataToProps)
)(Home);
