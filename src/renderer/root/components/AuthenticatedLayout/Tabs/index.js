import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openTab, closeTab, setActiveTab } from 'browser/actions/browserActions';

import Tabs from './Tabs';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onOpen: () => openTab(),
  onClose: (sessionId) => closeTab(sessionId),
  setActiveTab
}, dispatch);

export default connect(null, mapDispatchToProps)(Tabs);
