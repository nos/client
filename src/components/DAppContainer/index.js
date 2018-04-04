import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withData } from 'spunky';

import DAppContainer from './DAppContainer';
import nameServiceActions from '../../actions/nameServiceActions';
import { enqueue, dequeue } from '../../actions/requestsActions';

const mapDispatchToProps = (dispatch) => ({
  enqueue: (request) => dispatch(enqueue(request)),
  dequeue: (id) => dispatch(dequeue(id))
});

const mapNameServiceDataToProps = (data) => ({
  src: (data && data.target) || 'dapp.html'
});

export default compose(
  connect(null, mapDispatchToProps),
  withData(nameServiceActions, mapNameServiceDataToProps)
)(DAppContainer);
