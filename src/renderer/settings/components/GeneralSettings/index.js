import { compose } from 'recompose';
import { withData, withActions } from 'spunky';

import GeneralSettings from './GeneralSettings';
import currencyActions, { setCurrency } from '../../actions/currencyActions';

const mapCurrencyDataToProps = (currency) => ({ currency });

const mapCurrencyActionsToProps = (actions) => ({
  setCurrency: actions.call
});

export default compose(
  withActions(setCurrency, mapCurrencyActionsToProps),
  withData(currencyActions, mapCurrencyDataToProps)
)(GeneralSettings);
