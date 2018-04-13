import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withData, withActions, withProgressComponents, progressValues } from 'spunky';
import uuid from 'uuid/v1';

import DAppContainer from './DAppContainer';
import Loading from '../../Loading';
import Failed from '../../Failed';
import nameServiceActions from '../../../actions/nameServiceActions';
import { enqueue, dequeue, empty } from '../../../actions/requestsActions';
import withInitialCall from '../../../hocs/withInitialCall';

const { LOADING, FAILED } = progressValues;

const mapDispatchToProps = (dispatch) => bindActionCreators({ enqueue, dequeue, empty }, dispatch);

const mapNameServiceActionsToProps = (actions) => ({
  query: (params) => actions.call(params)
});

const mapNameServiceDataToProps = ({ target }) => ({ src: target });

export default compose(
  connect(null, mapDispatchToProps),
  withInitialCall(nameServiceActions, () => 'nos.neo'),
  withActions(nameServiceActions, mapNameServiceActionsToProps),
  withProgressComponents(nameServiceActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }),
  withData(nameServiceActions, mapNameServiceDataToProps),
  withProps(() => ({ sessionId: uuid() }))
)(DAppContainer);
