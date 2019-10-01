import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DAppContainer from './DAppContainer';
import { enqueue, dequeue, empty } from '../../actions/requestsActions';
import {
  setTabTitle,
  setTabTarget,
  setTabIcon,
  setTabLoaded,
  openTab,
  closeTab
} from '../../actions/browserActions';
import withWebviewIPC from '../../hocs/withWebviewIPC';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setTabTitle,
      setTabTarget,
      setTabIcon,
      setTabLoaded,
      openTab,
      closeTab,
      enqueue,
      dequeue,
      empty
    },
    dispatch
  );

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withWebviewIPC
)(DAppContainer);
