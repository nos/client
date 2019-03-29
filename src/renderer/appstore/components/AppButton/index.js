import { connect } from 'react-redux';

import { openTab } from 'browser/actions/browserActions';
import { ACCOUNT, EXTERNAL, INTERNAL } from 'browser/values/browserValues';

import AppButton from './AppButton';

const mapDispatchToProps = (dispatch) => ({
  openApp: (target) => () => dispatch(openTab({
    type: target === ACCOUNT ? INTERNAL : EXTERNAL, target
  }))
});

export default connect(null, mapDispatchToProps)(AppButton);
