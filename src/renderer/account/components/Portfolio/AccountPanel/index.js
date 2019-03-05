import { compose } from 'recompose';
import { withData } from 'spunky';

import authActions from 'auth/actions/authActions';
import currencyActions from 'settings/actions/currencyActions';

import AccountPanel from './AccountPanel';

const mapAuthDataToProps = ({ address }) => ({ address });
const mapCurrencyDataToProps = (currency) => ({ currency });

export default compose(
  withData(authActions, mapAuthDataToProps),
  withData(currencyActions, mapCurrencyDataToProps)
)(AccountPanel);
