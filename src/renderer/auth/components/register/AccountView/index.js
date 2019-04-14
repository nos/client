import { compose } from 'recompose';
import { withActions } from 'spunky';

import createAccountActions from 'auth/actions/createAccountActions';

import AccountView from './AccountView';

const mapAccountActionsToProps = (actions) => ({
  dawdawdawd: () => actions.reset()
});

export default compose(withActions(createAccountActions, mapAccountActionsToProps))(AccountView);
