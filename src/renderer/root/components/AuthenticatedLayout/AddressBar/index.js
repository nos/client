import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers } from 'recompose';

import { navigate } from 'browser/actions/browserActions';

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

const mapDispatchToProps = (dispatch) => bindActionCreators({ navigate }, dispatch);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onQuery: (props) => (target) => {
      props.navigate(props.activeSessionId, target);
    }
  })
)(AddressBar);
