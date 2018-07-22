import { compose } from 'recompose';
import { connect } from 'react-redux';

import withAuthState from 'login/hocs/withAuthState';
import withNetworkData from 'shared/hocs/withNetworkData';

import AuthenticatedLayout from './AuthenticatedLayout';

const mapStateToProps = (state) => {
  const { tabs, activeSessionId } = state.browser;
  return { tabs, activeSessionId };
};

export default compose(
  connect(mapStateToProps),
  withAuthState(),
  withNetworkData('currentNetwork')
)(AuthenticatedLayout);
