import { compose, withState, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withData } from 'spunky';

import queryActions from 'browser/actions/queryActions';

import AddressBar from './AddressBar';

const mapQueryDataToProps = (query) => ({ query });

export default compose(
  withRouter,
  withData(queryActions, mapQueryDataToProps),
  withProps((props) => ({
    key: props.query,
    doQuery: (query) => props.history.push(`/browser/${encodeURIComponent(query)}`)
  })),
  withState('query', 'setQuery', ({ query }) => query || '')
)(AddressBar);
