import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tabs from './Tabs';
import { openTab, closeTab, setActiveTab } from '../../actions/browserActions';

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onOpen: openTab,
  onClose: closeTab,
  setActiveTab
}, dispatch);

export default connect(null, mapDispatchToProps)(Tabs);
