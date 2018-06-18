import { compose } from 'recompose';

import withAuthState from 'login/hocs/withAuthState';
import withNetworkData from 'shared/hocs/withNetworkData';

import AuthenticatedLayout from './AuthenticatedLayout';

export default compose(
  withAuthState(),
  withNetworkData('currentNetwork')
)(AuthenticatedLayout);
