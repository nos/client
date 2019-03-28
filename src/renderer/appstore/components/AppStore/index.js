import { compose } from 'recompose';
import { withData } from 'spunky';

import withInitialCall from 'shared/hocs/withInitialCall';
import { withErrorToast } from 'shared/hocs/withToast';
import withLoadingProp from 'shared/hocs/withLoadingProp';

import AppStore from './AppStore';
import getAppStoreData from '../../actions/getAppStoreData';

export default compose(
  withInitialCall(getAppStoreData),
  withLoadingProp(getAppStoreData),
  withErrorToast(),
  withData(getAppStoreData)
)(AppStore);
