import { connect } from 'react-redux';
import { get } from 'lodash';

import RequestProcessor from './RequestProcessor';

const mapStateToProps = (state) => ({
  request: get(state, 'requests.0')
});

export default connect(mapStateToProps)(RequestProcessor);
