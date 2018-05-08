import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuid from 'uuid/v1';

import DAppContainer from './DAppContainer';
import { enqueue, dequeue, empty } from '../../../actions/requestsActions';

const mapDispatchToProps = (dispatch) => bindActionCreators({ enqueue, dequeue, empty }, dispatch);

export default compose(
  connect(null, mapDispatchToProps),
  withProps(() => ({ sessionId: uuid() }))
)(DAppContainer);
