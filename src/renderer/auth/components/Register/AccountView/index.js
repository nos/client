// export { default } from './AccountView';

import { compose } from 'recompose';
import { withData } from 'spunky';

import registerFormActions from 'auth/actions/registerFormActions';

import AccountView from './AccountView';

const mapAccountDataToProps = (account) => ({ account });

export default compose(withData(registerFormActions, mapAccountDataToProps))(AccountView);
