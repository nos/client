import { connect } from 'react-redux';

import RequestProcessor from './RequestProcessor';

const mapStateToProps = (state) => ({
  request: state.requests[0]
});

export default connect(mapStateToProps)(RequestProcessor);
