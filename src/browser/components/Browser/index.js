import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Browser from './Browser';
import { query } from '../../actions/browserActions';

const mapStateToProps = (state) => {
  const { tabs, activeSessionId } = state.browser;
  return { tabs, activeSessionId, query: tabs[activeSessionId].target };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ onQuery: query }, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onQuery: (props) => (...args) => props.onQuery(props.activeSessionId, ...args)
  })
)(Browser);
