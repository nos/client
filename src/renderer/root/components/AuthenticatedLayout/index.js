import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withActions } from 'spunky';

import blockActions from 'shared/actions/blockActions';
import withAuthState from 'login/hocs/withAuthState';
import withNetworkData from 'shared/hocs/withNetworkData';

import AuthenticatedLayout from './AuthenticatedLayout';

const mapStateToProps = (state) => {
  const { tabs, activeSessionId } = state.browser;
  return { tabs, activeSessionId };
};

const mapBlockActionsToProps = (actions, props) => ({
  getLastBlock: () => actions.call({ net: props.currentNetwork })
});

export default compose(
  connect(mapStateToProps),
  withAuthState(),
  withNetworkData('currentNetwork'),
  withActions(blockActions, mapBlockActionsToProps),
)(AuthenticatedLayout);
