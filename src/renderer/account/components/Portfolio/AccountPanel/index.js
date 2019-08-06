import { compose } from 'recompose';
import { withData } from 'spunky';

import currencyActions from 'settings/actions/currencyActions';
import withActiveWallet from 'shared/hocs/withActiveWallet';

import AccountPanel from './AccountPanel';

const mapCurrencyDataToProps = (currency) => ({ currency });

export default compose(
  withActiveWallet(),
  withData(currencyActions, mapCurrencyDataToProps)
)(AccountPanel);
