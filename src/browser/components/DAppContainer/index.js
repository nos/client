import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DAppContainer from './DAppContainer';
import { setTabTitle } from '../../actions/browserActions';
import { enqueue, dequeue, empty } from '../../actions/requestsActions';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setTabTitle,
  enqueue,
  dequeue,
  empty
}, dispatch);

export default connect(null, mapDispatchToProps)(DAppContainer);
