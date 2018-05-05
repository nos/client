import { compose } from 'recompose';

import AuthenticatedLayout from './AuthenticatedLayout';
import withAuthState from '../../login/hocs/withAuthState';
import withNetworkData from '../../shared/hocs/withNetworkData';

export default compose(
  withAuthState(),
  withNetworkData('currentNetwork')
)(AuthenticatedLayout);
