import { compose } from 'recompose';
import { withActions, withData, withReset, progressValues } from 'spunky';

import balanceWithPricesActions from 'account/actions/balanceWithPricesActions';

import withProgressChange from 'shared/hocs/withProgressChange';
import { withSuccessToast, withErrorToast } from 'shared/hocs/withToast';

import GeneralSettings from './GeneralSettings';
import currencyActions, { setCurrency } from '../../actions/currencyActions';
import autoUpdateActions, { setAutoUpdateActions } from '../../actions/autoUpdateActions';
import feeActions, { setFee } from '../../actions/feeActions';
import themeActions, { setTheme } from '../../actions/themeActions';

const { LOADED, FAILED } = progressValues;

const mapCurrencyDataToProps = (currency) => ({ currency });
const mapFeeDataToProps = (fee) => ({ fee });
const mapThemeDataToProps = (theme) => ({ theme });
const mapAutoUpdateDataToProps = (autoUpdates) => ({ autoUpdates });

const mapCurrencyActionsToProps = (actions) => ({
  setCurrency: actions.call
});

const mapFeeActionsToProps = (actions) => ({
  setFee: actions.call
});

const mapThemeActionsToProps = (actions) => ({
  setTheme: actions.call
});

const mapAutoUpdateActionsToProps = (actions) => ({
  toggleAutoUpdates: actions.call
});

export default compose(
  withActions(setAutoUpdateActions, mapAutoUpdateActionsToProps),
  withData(autoUpdateActions, mapAutoUpdateDataToProps),

  withActions(setCurrency, mapCurrencyActionsToProps),
  withData(currencyActions, mapCurrencyDataToProps),

  withActions(setFee, mapFeeActionsToProps),
  withData(feeActions, mapFeeDataToProps),

  withActions(setTheme, mapThemeActionsToProps),
  withData(themeActions, mapThemeDataToProps),

  withReset(balanceWithPricesActions, 'currency'),

  withSuccessToast(),
  withProgressChange(setCurrency, LOADED, (state, props) => {
    props.showSuccessToast('Settings successfully updated');
  }),
  withProgressChange(setFee, LOADED, (state, props) => {
    props.showSuccessToast('Settings successfully updated');
  }),
  withProgressChange(setTheme, LOADED, (state, props) => {
    props.showSuccessToast('Settings successfully updated');
  }),
  withProgressChange(setAutoUpdateActions, LOADED, (state, props) => {
    props.showSuccessToast('Settings successfully updated');
  }),

  withErrorToast(),
  withProgressChange(setCurrency, FAILED, (state, props) => {
    props.showErrorToast(`Error updating settings: ${state.error}`);
  }),
  withProgressChange(setFee, FAILED, (state, props) => {
    props.showErrorToast(`Error updating settings: ${state.error}`);
  }),
  withProgressChange(setTheme, FAILED, (state, props) => {
    props.showErrorToast(`Error updating settings: ${state.error}`);
  }),
  withProgressChange(setAutoUpdateActions, FAILED, (state, props) => {
    props.showErrorToast(`Error updating settings: ${state.error}`);
  })
)(GeneralSettings);
