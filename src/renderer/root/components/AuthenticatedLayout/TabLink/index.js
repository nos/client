import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openTab } from 'browser/actions/browserActions';

import TabLink from './TabLink';

const mapDispatchToProps = (dispatch) => bindActionCreators({ openTab }, dispatch);

export default connect(null, mapDispatchToProps)(TabLink);
