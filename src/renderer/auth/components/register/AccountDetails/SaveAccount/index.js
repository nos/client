import { compose, withProps } from 'recompose';
import { withActions, withProgress, progressValues } from 'spunky';

import pureStrategy from 'shared/hocs/strategies/pureStrategy';
import { writePreviousAuthActions } from 'auth/actions/previousAuthActions';
import authActions from 'auth/actions/authActions';
import withAlert from 'shared/hocs/withAlert';
import storeProfileActions from 'auth/actions/profileActions';
import { appendAccountActions } from 'auth/actions/accountActions';

import SaveAccount from './SaveAccount';

const { LOADING } = progressValues;

const mapPreviousAuthActionsToProps = (actions) => ({
  setLastLogin: (data) => actions.call(data)
});

const mapStoreProfileActionsToProps = (actions) => ({
  storeProfile: (data) => {
    return actions.call(data);
  }
});

const mapAuthActionsToProps = (actions) => ({
  login: (data) => {
    return actions.call(data);
  }
});

export default compose(
  withAlert(),
  withActions(authActions, mapAuthActionsToProps),
  withActions(writePreviousAuthActions, mapPreviousAuthActionsToProps),
  withActions(appendAccountActions, mapStoreProfileActionsToProps),
  withActions(authActions, mapAuthActionsToProps),
  withProgress(authActions, { strategy: pureStrategy }),
  withProps((props) => ({ loading: props.progress === LOADING }))
)(SaveAccount);
