import { connect } from 'react-redux';
import { get } from 'lodash';

import RequestProcessor from './RequestProcessor';

const mapStateToProps = (state, ownProps) => ({
  requests: get(state, `requests.${ownProps.sessionId}`, [])
});

export default connect(mapStateToProps)(RequestProcessor);
