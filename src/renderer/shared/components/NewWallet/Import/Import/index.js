import { compose, withState } from 'recompose';
import { withData } from 'spunky';

import withInitialCall from 'shared/hocs/withInitialCall';
import accountActions from 'auth/actions/v5AccountsActions';

import ImportWallet from './ImportWallet';

const mapAccountActionsDataToProps = (accounts) => ({
  accounts: accounts && accounts.profiles
});

export default compose(
  withInitialCall(accountActions),
  withData(accountActions, mapAccountActionsDataToProps),

  withState('newImport', 'setNewImport', true)
)(ImportWallet);
