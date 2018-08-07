import { withData } from 'spunky';

import Register from './Register';
import createAccountActions from '../../actions/createAccountActions';

const mapAccountDataToProps = (account) => ({ account });

export default withData(createAccountActions, mapAccountDataToProps)(Register);
