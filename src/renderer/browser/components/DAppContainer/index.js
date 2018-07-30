import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { withData } from 'spunky';

import authActions from 'login/actions/authActions';

import DAppContainer from './DAppContainer';
import { enqueue, dequeue, empty } from '../../actions/requestsActions';
import {
  setTabError,
  setTabTitle,
  setTabTarget,
  setTabLoaded,
  openTab,
  closeTab
} from '../../actions/browserActions';

const mapAuthDataToProps = ({ address }) => ({ address });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setTabError,
  setTabTitle,
  setTabTarget,
  setTabLoaded,
  openTab,
  closeTab,
  enqueue,
  dequeue,
  empty
}, dispatch);

export default compose(
  connect(null, mapDispatchToProps),
  withData(authActions, mapAuthDataToProps)
)(DAppContainer);
