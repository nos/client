import { compose } from 'recompose';
import { withData } from 'spunky';

import authActions from 'auth/actions/authActions';

import Wallets from './Wallets';

const mapAuthDataToProps = (account) => ({ account });

export default compose(withData(authActions, mapAuthDataToProps))(Wallets);
