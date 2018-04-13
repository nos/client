import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withData } from 'spunky';
import uuid from 'uuid/v1';

import DAppContainer from './DAppContainer';
import nameServiceActions from '../../actions/nameServiceActions';
import { enqueue, dequeue, empty } from '../../actions/requestsActions';

const mapDispatchToProps = (dispatch) => bindActionCreators({ enqueue, dequeue, empty }, dispatch);

const mapNameServiceDataToProps = (data) => ({
  src: (data && data.target) || 'welcome.html'
});

export default compose(
  connect(null, mapDispatchToProps),
  withData(nameServiceActions, mapNameServiceDataToProps),
  withProps(() => ({ sessionId: uuid() }))
)(DAppContainer);
