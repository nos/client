import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import Browser from './Browser';
import { setTabTarget } from '../../actions/browserActions';

const mapStateToProps = (state) => {
  const { tabs, activeSessionId } = state.browser;
  const { target, addressBarEntry, requestCount } = tabs[activeSessionId];

  return { tabs, activeSessionId, target, addressBarEntry, requestCount };
};

const mapDispatchToProps = (dispatch) => ({
  onQuery: (sessionId, target) => {
    dispatch(setTabTarget(sessionId, target, { addressBarEntry: true }));
  }
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onQuery: (props) => (...args) => props.onQuery(props.activeSessionId, ...args)
  })
)(Browser);
