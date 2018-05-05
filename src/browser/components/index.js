import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withCall, withData, withProgressComponents, progressValues } from 'spunky';

import Browser from './Browser';
import Loading from '../../shared/components/Loading';
import Failed from '../../shared/components/Failed';
import queryActions from '../actions/queryActions';
import parseURL from '../util/parseURL';

const { LOADING, FAILED } = progressValues;

const formatQuery = (query) => {
  const { href } = parseURL(query);
  return href;
};

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
