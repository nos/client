import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openTab } from 'browser/actions/browserActions';

import Transaction from './Transaction';

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onOpen: (target) => openTab(target && { target })
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Transaction);
