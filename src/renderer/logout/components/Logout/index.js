import { compose, withProps } from 'recompose';
import { withActions } from 'spunky';
import { connect } from 'react-redux';

import accountActions from 'shared/actions/accountActions';
import blockActions from 'shared/actions/blockActions';
import withWebviewIPC from 'browser/hocs/withWebviewIPC';
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
  connect(
    null,
    mapDispatchToProps
  ),
  withActions(accountActions, mapAccountActionsToProps),
  withActions(blockActions, mapBlockActionsToProps),
  withLogout((state, { history }) => history.push('/browser')),
  withWebviewIPC,
  withProps(
    ({
      emptyAllRequests,
      history,
      resetAllTabs,
      resetAuth,
      resetBlock,
      onFocus
    }) => ({
      logout: () => {
        resetAuth();
        resetBlock();
        resetAllTabs();
        emptyAllRequests();
        onFocus(null);
        history.push('browser');
      }
    })
  )
)(Logout);
