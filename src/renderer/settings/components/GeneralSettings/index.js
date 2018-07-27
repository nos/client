import { compose } from 'recompose';
import { withActions, withData, withReset } from 'spunky';

import pricesActions from 'account/actions/pricesActions';

import GeneralSettings from './GeneralSettings';
import currencyActions, { setCurrency } from '../../actions/currencyActions';

const mapCurrencyDataToProps = (currency) => ({ currency });

const mapCurrencyActionsToProps = (actions) => ({
  setCurrency: actions.call
});

export default compose(
  withActions(setCurrency, mapCurrencyActionsToProps),
  withData(currencyActions, mapCurrencyDataToProps),
  withReset(pricesActions, 'currency')
)(GeneralSettings);
