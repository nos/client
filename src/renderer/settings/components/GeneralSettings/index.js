import { compose } from 'recompose';
import { withActions, withData, withReset, progressValues } from 'spunky';

import pricesActions from 'account/actions/pricesActions';
import withProgressChange from 'shared/hocs/withProgressChange';
import { withSuccessToast, withErrorToast } from 'shared/hocs/withToast';

import GeneralSettings from './GeneralSettings';
import currencyActions, { setCurrency } from '../../actions/currencyActions';
import feeActions, { setFee } from '../../actions/feeActions';

const { LOADED, FAILED } = progressValues;

const mapCurrencyDataToProps = (currency) => ({ currency });
const mapFeeDataToProps = (fee) => ({ fee });

const mapCurrencyActionsToProps = (actions) => ({
  setCurrency: actions.call
});

const mapFeeActionsToProps = (actions) => ({
  setFee: actions.call
});

export default compose(
  withActions(setCurrency, mapCurrencyActionsToProps),
  withData(currencyActions, mapCurrencyDataToProps),

  withActions(setFee, mapFeeActionsToProps),
  withData(feeActions, mapFeeDataToProps),

  withReset(pricesActions, 'currency'),

  withSuccessToast(),
  withProgressChange(setCurrency, LOADED, (state, props) => {
    props.showSuccessToast('Settings successfully updated');
  }),
  withProgressChange(setFee, LOADED, (state, props) => {
    props.showSuccessToast('Settings successfully updated');
  }),

  withErrorToast(),
  withProgressChange(setCurrency, FAILED, (state, props) => {
    props.showErrorToast(`Error updating settings: ${state.error}`);
  }),
  withProgressChange(setFee, FAILED, (state, props) => {
    props.showErrorToast(`Error updating settings: ${state.error}`);
  })
)(GeneralSettings);
