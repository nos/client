import { compose, withProps } from 'recompose';
import { withData } from 'spunky';
import { pickBy } from 'lodash';

import balancesActions from 'shared/actions/balancesActions';
import authActions from 'login/actions/authActions';

import AccountPanel from './AccountPanel';

const mapAuthDataToProps = ({ address }) => ({ address });

const mapBalancesDataToProps = (balances) => ({ balances });

export default compose(
  withData(authActions, mapAuthDataToProps),
  withData(balancesActions, mapBalancesDataToProps),
  withProps(({ balances }) => ({
    balances: pickBy(balances, ({ balance }) => balance !== '0')
  }))
)(AccountPanel);
