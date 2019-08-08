import { compose, withProps } from 'recompose';
import { withData } from 'spunky';

import currencyActions from '../../../../settings/actions/currencyActions';
import withActiveAccount from '../../../../shared/hocs/withActiveAccount';
import { NOS, NEO, ARK } from '../../../../shared/values/assets';
import { DEFAULT_NET } from '../../../../../common/values/networks';

import AccountPanel from './AccountPanel';

const mapCurrencyDataToProps = (currency) => ({ currency });

export default compose(
  withActiveAccount(),
  withProps(({ net, coinType }) => {
    if (coinType === 111) {
      return { DEFAULT_TOKEN: ARK };
    }
    return { DEFAULT_TOKEN: net === DEFAULT_NET ? NOS : NEO };
  }),
  withData(currencyActions, mapCurrencyDataToProps)
)(AccountPanel);
