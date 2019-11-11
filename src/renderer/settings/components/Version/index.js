import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import { openTab } from 'browser/actions/browserActions';
import { EXTERNAL } from 'browser/values/browserValues';

import Version from './Version';
import pkg from '../../../../../package.json';

const mapDispatchToProps = (dispatch) => ({
  openTab: (target) => dispatch(openTab({ type: EXTERNAL, target }))
});

export default compose(
  connect(null, mapDispatchToProps),
  withProps({ current: pkg.version })
)(Version);
