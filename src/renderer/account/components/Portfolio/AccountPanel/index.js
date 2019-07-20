import { compose } from 'recompose';
import { withData } from 'spunky';

import currencyActions from 'settings/actions/currencyActions';
import withActiveAccount from 'shared/hocs/withActiveAccount';

import AccountPanel from './AccountPanel';

const mapCurrencyDataToProps = (currency) => ({ currency });

export default compose(
  withActiveAccount(),
  withData(currencyActions, mapCurrencyDataToProps)
)(AccountPanel);
