import { compose } from 'recompose';
import { connect } from 'react-redux';
import { get } from 'lodash';

import withAuthState from 'auth/hocs/withAuthState';

import RequestsProcessor from './RequestsProcessor';

const mapStateToProps = (state, ownProps) => ({
  requests: get(state, `requests.${ownProps.sessionId}`, [])
});

export default compose(withAuthState(), connect(mapStateToProps))(RequestsProcessor);
