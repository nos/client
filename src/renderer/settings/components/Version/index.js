import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { withCall, withData } from 'spunky';

import withLoadingProp from 'shared/hocs/withLoadingProp';
import { openTab } from 'browser/actions/browserActions';
import { EXTERNAL } from 'browser/values/browserValues';

import Version from './Version';
import versionActions from '../../actions/versionActions';
import pkg from '../../../../../package.json';

const mapVersionToProps = (version) => ({
  latest: version
});

const mapDispatchToProps = (dispatch) => ({
  openTab: (target) => dispatch(openTab({ type: EXTERNAL, target }))
});

export default compose(
  connect(null, mapDispatchToProps),
  withProps({ current: pkg.version }),
  withCall(versionActions),
  withLoadingProp(versionActions),
  withData(versionActions, mapVersionToProps)
)(Version);
