import { connect } from 'react-redux';

import Session from './Session';
import { setTabTarget } from '../../actions/browserActions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onQuery: (target) => {
    dispatch(setTabTarget(ownProps.sessionId, target, { addressBarEntry: true }));
  }
});

export default connect(null, mapDispatchToProps)(Session);
