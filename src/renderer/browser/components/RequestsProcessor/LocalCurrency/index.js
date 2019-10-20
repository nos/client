import { compose } from 'recompose';
import { withData } from 'spunky';

import withInitialCall from 'shared/hocs/withInitialCall';

import withClean from '../../../hocs/withClean';
import withNullLoader from '../../../hocs/withNullLoader';

import LocalCurrency from './LocalCurrency';

const mapLocalCurrencyActionsDataToProps = (data) => ({ data });

export default function makeGetLocalCurrency(localCurrencyActions) {
  return compose(
    withClean(localCurrencyActions),
    withInitialCall(localCurrencyActions),
    withNullLoader(localCurrencyActions),
    withData(localCurrencyActions, mapLocalCurrencyActionsDataToProps)
  )(LocalCurrency);
}
