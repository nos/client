import { connect } from 'react-redux';

import { openTab } from 'browser/actions/browserActions';
import { ACCOUNT, EXTERNAL, INTERNAL } from 'browser/values/browserValues';

import AppButton from './AppButton';

const mapDispatchToProps = (dispatch) => ({
  openAccountApp: () => dispatch(openTab({ type: INTERNAL, target: ACCOUNT })),
  openExternalApp: (target) => () => dispatch(openTab({ type: EXTERNAL, target }))
});

export default connect(null, mapDispatchToProps)(AppButton);
