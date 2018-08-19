import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openTab } from 'browser/actions/browserActions';

import TabLink from './TabLink';

const mapStateToProps = (state, props) => {
  const { tabs, activeSessionId } = state.browser;
  const active = props.target === tabs[activeSessionId].target;
  return { active };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ openTab }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabLink);
