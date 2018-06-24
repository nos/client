import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openTab, closeTab, setActiveTab } from 'actions/browserActions';

import Tabs from './Tabs';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onOpen: openTab,
  onClose: closeTab,
  setActiveTab
}, dispatch);

export default connect(null, mapDispatchToProps)(Tabs);
