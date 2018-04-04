import { compose } from 'recompose';
import { withData, withActions } from 'spunky';

import Register from './Register';
import createAccountActions from '../../actions/createAccountActions';
import withImmediateReset from '../../hocs/withImmediateReset';

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
  withData(createAccountActions, mapAccountDataToProps)
)(Register);
