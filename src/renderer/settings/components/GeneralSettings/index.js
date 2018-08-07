import { compose } from 'recompose';
import { withActions, withData, withReset, progressValues } from 'spunky';

import pricesActions from 'account/actions/pricesActions';
import withProgressChange from 'shared/hocs/withProgressChange';
import { withSuccessToast, withErrorToast } from 'shared/hocs/withToast';

import GeneralSettings from './GeneralSettings';
import currencyActions, { setCurrency } from '../../actions/currencyActions';

const { LOADED, FAILED } = progressValues;

const mapCurrencyDataToProps = (currency) => ({ currency });

const mapCurrencyActionsToProps = (actions) => ({
  setCurrency: actions.call
});

export default compose(
  withActions(setCurrency, mapCurrencyActionsToProps),
  withData(currencyActions, mapCurrencyDataToProps),
  withReset(pricesActions, 'currency'),

  withSuccessToast(),
  withProgressChange(setCurrency, LOADED, (state, props) => {
    props.showSuccessToast('Settings successfully updated');
  }),

  withErrorToast(),
  withProgressChange(setCurrency, FAILED, (state, props) => {
    props.showErrorToast(`Error updating settings: ${state.error}`);
  })
)(GeneralSettings);
