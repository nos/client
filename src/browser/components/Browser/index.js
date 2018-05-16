import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Browser from './Browser';
import { setTabTarget } from '../../actions/browserActions';

const mapStateToProps = (state) => {
  const { tabs, activeSessionId } = state.browser;
  const { target } = tabs[activeSessionId];

  return { tabs, activeSessionId, target };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ onQuery: setTabTarget }, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onQuery: (props) => (...args) => props.onQuery(props.activeSessionId, ...args)
  })
)(Browser);
