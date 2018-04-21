import { compose } from 'recompose';

import AuthenticatedLayout from './AuthenticatedLayout';
import withAuthState from '../../hocs/withAuthState';
import withNetworkData from '../../hocs/withNetworkData';

export default compose(
  withAuthState(),
  withNetworkData('currentNetwork')
)(AuthenticatedLayout);
