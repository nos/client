import { connect } from 'react-redux';
import { get } from 'lodash';

import RequestsProcessor from './RequestsProcessor';

const mapStateToProps = (state, ownProps) => ({
  requests: get(state, `requests.${ownProps.sessionId}`, [])
});

export default connect(mapStateToProps)(RequestsProcessor);
