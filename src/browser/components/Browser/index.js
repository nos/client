import { compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuid from 'uuid/v1';

import Browser from './Browser';
import { query } from '../../actions/browserActions';

const mapStateToProps = (state) => ({
  query: state.browser.target
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators({
  onQuery: (...args) => query(props.sessionId, ...args)
}, dispatch);

export default compose(
  withProps(() => ({ sessionId: uuid() })),
  connect(mapStateToProps, mapDispatchToProps)
)(Browser);
