import { compose } from 'recompose';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { withProgress } from 'spunky';

import authActions from 'auth/actions/authActions';

import RequestsProcessor from './RequestsProcessor';

const mapStateToProps = (state, ownProps) => ({
  requests: get(state, `requests.${ownProps.sessionId}`, [])
});

export default compose(
  withProgress(authActions),
  connect(mapStateToProps)
)(RequestsProcessor);
