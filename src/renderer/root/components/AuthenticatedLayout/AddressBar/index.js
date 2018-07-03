import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers } from 'recompose';

import { setTabTarget } from 'browser/actions/browserActions';

import AddressBar from './AddressBar';

const stripTrailingSlash = (target) => {
  return target.replace(/^(\w+:\/{2,}[\w@:]+)\/$/, '$1'); // strip trailing slash from TLD
};

const mapStateToProps = (state) => {
  const { tabs, activeSessionId } = state.browser;
  const tab = tabs[activeSessionId];
  const query = stripTrailingSlash(tab.target);

  return { activeSessionId, query };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ setTabTarget }, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onQuery: (ownProps) => (target) => {
      ownProps.setTabTarget(ownProps.sessionId, target, { addressBarEntry: true });
    }
  })
)(AddressBar);
