import { compose, withPropsOnChange } from 'recompose';
import { connect } from 'react-redux';

import AddressBar from './AddressBar';

const mapStateToProps = (state) => {
  const tabCount = Object.keys(state.browser.tabs).length

  return { tabCount };
};

export default compose(
  connect(mapStateToProps),
  withPropsOnChange(['query'], (props) => ({
    query: props.query.replace(/^(\w+:\/{2,}[\w@:]+)\/$/, '$1') // strip trailing slash from TLD
  }))
)(AddressBar);
