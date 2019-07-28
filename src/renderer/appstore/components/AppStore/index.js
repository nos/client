import { compose } from 'recompose';
import { withData, withProgressComponents, LOADING, FAILED } from 'spunky';

import withInitialCall from 'shared/hocs/withInitialCall';
import { withErrorToast } from 'shared/hocs/withToast';
import Loading from 'shared/components/Loading';
import withProgressChange from 'shared/hocs/withProgressChange';

import AppStore from './AppStore';
import getAppStoreData from '../../actions/getAppStoreData';

export default compose(
  withInitialCall(getAppStoreData),
  withProgressComponents(
    getAppStoreData,
    {
      [LOADING]: Loading
    }
  ),
  withErrorToast(),
  withProgressChange(getAppStoreData, FAILED, (state, props) => {
    props.showErrorToast(`Loading is taking longer than expected. Please try again later. ${state.error}`);
  }),
  withData(getAppStoreData)
)(AppStore);
