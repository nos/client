import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers } from 'recompose';
import { ipcRenderer } from 'electron';

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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onQuery: (props) => (target) => {
      props.navigate(props.activeSessionId, target);
    },
    onBack: (_props) => () => ipcRenderer.send('history:back'),
    onForward: (_props) => () => ipcRenderer.send('history:forward'),
    onReload: (_props) => () => ipcRenderer.send('view:reload')
  })
)(AddressBar);
