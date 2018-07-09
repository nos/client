import { connect } from 'react-redux';

import Browser from './Browser';

const mapStateToProps = (state) => {
  const { tabs, activeSessionId } = state.browser;
  return { tabs, activeSessionId };
};

export default connect(mapStateToProps)(Browser);
