import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withData } from 'spunky';

import { openTab } from 'browser/actions/browserActions';
import currencyActions from 'settings/actions/currencyActions';

import ConversionInput from './ConversionInput';

const mapCurrencyDataToProps = (currency) => ({ currency });
const mapDispatchToProps = (dispatch) => ({
  openTab: ({ target }) => dispatch(openTab({ target }))
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withData(currencyActions, mapCurrencyDataToProps)
)(ConversionInput);
