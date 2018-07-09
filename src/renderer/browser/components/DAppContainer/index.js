import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DAppContainer from './DAppContainer';
import { setTabError, setTabTitle, setTabTarget, setTabLoaded, closeTab } from '../../actions/browserActions';
import { enqueue, dequeue, empty } from '../../actions/requestsActions';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setTabError,
  setTabTitle,
  setTabTarget,
  setTabLoaded,
  closeTab,
  enqueue,
  dequeue,
  empty
}, dispatch);

export default connect(null, mapDispatchToProps)(DAppContainer);
