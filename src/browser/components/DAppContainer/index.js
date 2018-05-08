import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DAppContainer from './DAppContainer';
import { enqueue, dequeue, empty } from '../../actions/requestsActions';

const mapDispatchToProps = (dispatch) => bindActionCreators({ enqueue, dequeue, empty }, dispatch);

export default connect(null, mapDispatchToProps)(DAppContainer);
