import { compose, withProps } from 'recompose';
import { withData } from 'spunky';

import currencyActions from 'settings/actions/currencyActions';

import { NOS, NEO, ARK } from 'shared/values/assets';
import withActiveWallet from 'shared/hocs/withActiveWallet';

import { DEFAULT_NET } from '../../../../../common/values/networks';

import AccountPanel from './AccountPanel';

const mapCurrencyDataToProps = (currency) => ({ currency });

export default compose(
  withActiveWallet(),
  withProps(({ net, coinType }) => {
    if (coinType === 111) {
      return { DEFAULT_TOKEN: ARK };
    }
    return { DEFAULT_TOKEN: net === DEFAULT_NET ? NOS : NEO };
  }),
  withData(currencyActions, mapCurrencyDataToProps)
)(AccountPanel);
