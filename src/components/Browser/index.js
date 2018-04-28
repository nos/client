import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withCall, withData, withProgressComponents, progressValues } from 'spunky';

import Browser from './Browser';
import Loading from '../Loading';
import Failed from '../Failed';
import queryActions from '../../actions/queryActions';
import formatQuery from '../../util/formatQuery';

const { LOADING, FAILED } = progressValues;

const mapQueryDataToProps = (query) => ({
  query: formatQuery(query)
});

export default compose(
  withRouter,
  withCall(queryActions, ({ match }) => ({
    query: formatQuery(decodeURIComponent(match.params.query))
  })),
  withProgressComponents(queryActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }),
  withData(queryActions, mapQueryDataToProps),
)(Browser);
