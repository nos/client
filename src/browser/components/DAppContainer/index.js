import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DAppContainer from './DAppContainer';
import { setTabTitle, setTabTarget, setTabLoaded } from '../../actions/browserActions';
import { enqueue, dequeue, empty } from '../../actions/requestsActions';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setTabTitle,
  setTabTarget,
  setTabLoaded,
  enqueue,
  dequeue,
  empty
}, dispatch);

export default connect(null, mapDispatchToProps)(DAppContainer);
