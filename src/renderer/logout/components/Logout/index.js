import { compose, withProps } from 'recompose';
import { withActions } from 'spunky';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

import accountActions from 'shared/actions/accountActions';
import blockActions from 'shared/actions/blockActions';
import { resetTabs } from 'browser/actions/browserActions';
import { emptyAll } from 'browser/actions/requestsActions';

import Logout from './Logout';
import withLogout from '../../hocs/withLogout';

const mapAccountActionsToProps = ({ reset }) => ({ resetAuth: reset });
const mapBlockActionsToProps = ({ reset }) => ({ resetBlock: reset });

const mapDispatchToProps = (dispatch) => ({
  resetAllTabs: () => dispatch(resetTabs()),
  emptyAllRequests: () => dispatch(emptyAll())
});

export default compose(
  connect(null, mapDispatchToProps),
  withActions(accountActions, mapAccountActionsToProps),
  withActions(blockActions, mapBlockActionsToProps),
  withLogout((state, { history }) => history.push('/login')),
  withProps(({ emptyAllRequests, resetAllTabs, resetAuth, resetBlock }) => ({
    logout: () => {
      resetAuth();
      resetBlock();
      resetAllTabs();
      emptyAllRequests();
      ipcRenderer.send('webview:focus', null);
    }
  }))
)(Logout);
