// export { default } from './AccountView';

import { compose } from 'recompose';
import { withData } from 'spunky';

import registerActions from 'auth/actions/registerActions';

import AccountView from './AccountView';

const mapAccountDataToProps = (account) => ({ account });

export default compose(withData(registerActions, mapAccountDataToProps))(AccountView);
