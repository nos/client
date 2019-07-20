import { connect } from 'react-redux';

import { openTab } from 'browser/actions/browserActions';

import AppCard from './AppCard';

const mapDispatchToProps = (dispatch) => ({
  openApp: (target) => () =>
    dispatch(
      openTab({
        target
      })
    )
});

export default connect(
  null,
  mapDispatchToProps
)(AppCard);
