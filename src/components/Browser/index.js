import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withCall, withData, withProgressComponents, progressValues } from 'spunky';

import Browser from './Browser';
import Loading from '../Loading';
import Failed from '../Failed';
import nameServiceActions from '../../actions/nameServiceActions';

const { LOADING, FAILED } = progressValues;

const DEFAULT_QUERY = 'nos://nos.neo';

const mapNameServiceDataToProps = ({ target }) => ({ src: target });

export default compose(
  withRouter,
  withProps((props) => ({
    query: props.match.params.query ? decodeURIComponent(props.match.params.query) : DEFAULT_QUERY,
    doQuery: (query) => props.history.push(`/browser/${encodeURIComponent(query)}`)
  })),
  withCall(nameServiceActions, ({ query }) => query),
  withProgressComponents(nameServiceActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }),
  withData(nameServiceActions, mapNameServiceDataToProps),
)(Browser);
