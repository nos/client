import { connect } from 'react-redux';

import { openTab } from 'browser/actions/browserActions';
import { INTERNAL, SETTINGS } from 'browser/values/browserValues';

import PriorityFee from './PriorityFee';

const mapDispatchToProps = (dispatch) => ({
  openSettings: () => dispatch(openTab({ type: INTERNAL, target: SETTINGS }))
});

export default connect(
  null,
  mapDispatchToProps
)(PriorityFee);
