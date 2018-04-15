import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withData } from 'spunky';

import AddressBar from './AddressBar';
import nameServiceActions from '../../../actions/nameServiceActions';

const mapNameServiceDataToProps = (data) => ({
  query: data && data.query,
  target: data && data.target
});

export default compose(
  withRouter,
  withProps((props) => ({
    doQuery: (query) => props.history.push(`/browser/${encodeURIComponent(query)}`)
  })),
  withData(nameServiceActions, mapNameServiceDataToProps)
)(AddressBar);
