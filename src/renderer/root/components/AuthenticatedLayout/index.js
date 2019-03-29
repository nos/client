import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withActions, withData, progressValues } from 'spunky';
import { isEqual } from 'lodash';

import authActions from 'auth/actions/authActions';
import blockActions from 'shared/actions/blockActions';
import withAuthState from 'auth/hocs/withAuthState';
import withNetworkData from 'shared/hocs/withNetworkData';
import withProgressChange from 'shared/hocs/withProgressChange';
import notifyWebviews from 'shared/util/notifyWebviews';

import AuthenticatedLayout from './AuthenticatedLayout';

const { LOADED } = progressValues;

const mapStateToProps = (state) => {
  const { tabs, activeSessionId } = state.browser;
  return { tabs, activeSessionId };
};

const mapAuthDataToProps = (props) => ({
  address: (props && props.address) || undefined
});

const mapBlockActionsToProps = (actions, props) => ({
  getLastBlock: () => actions.call({ net: props.currentNetwork })
});

const mapBlockDataToProps = (block) => ({ block });

export default compose(
  connect(mapStateToProps),
  withAuthState(),
  withNetworkData('currentNetwork'),
  withActions(blockActions, mapBlockActionsToProps),

  // Whenever a new block is received, notify all dApps & update account balances.
  withData(authActions, mapAuthDataToProps), // TODO replace with activeAccount
  withData(blockActions, mapBlockDataToProps),
  withProgressChange(blockActions, LOADED, (state, props, prevProps) => {
    if (!isEqual(props.block, prevProps.block)) {
      notifyWebviews('event', 'block', props.block);
    }
  })
)(AuthenticatedLayout);
