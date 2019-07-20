import { compose } from 'recompose';
import { withData } from 'spunky';

import currencyActions from 'settings/actions/currencyActions';

import ConversionInput from './ConversionInput';

const mapCurrencyDataToProps = (currency) => ({ currency });

export default compose(withData(currencyActions, mapCurrencyDataToProps))(ConversionInput);
