import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

export default connect(null, mapDispatchToProps)(DAppContainer);
