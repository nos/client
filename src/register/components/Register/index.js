import { compose, withProps } from 'recompose';
import { withData, withActions, withProgress, progressValues } from 'spunky';

import withImmediateReset from 'shared/hocs/withImmediateReset';
import pureStrategy from 'shared/hocs/strategies/pureStrategy';

import Register from './Register';
import createAccountActions from '../../actions/createAccountActions';

const { LOADING } = progressValues;

const mapAccountActionsToProps = (actions) => ({
  reset: () => actions.reset(),
  register: ({ passphrase, passphraseConfirmation }) => {
    return actions.call({ passphrase, passphraseConfirmation });
  }
});

const mapAccountDataToProps = (account) => ({ account });

export default compose(
  withImmediateReset(createAccountActions),
  withActions(createAccountActions, mapAccountActionsToProps),
  withProgress(createAccountActions, { strategy: pureStrategy }),
  withProps((props) => ({ loading: props.progress === LOADING })),
  withData(createAccountActions, mapAccountDataToProps),
)(Register);
