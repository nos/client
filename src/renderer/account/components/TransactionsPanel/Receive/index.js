import { compose } from 'recompose';
import { withData } from 'spunky';

import authActions from 'login/actions/authActions';
import { withInfoToast } from 'shared/hocs/withToast';

import Receive from './Receive';

const mapAuthDataToProps = ({ address }) => ({ address });

export default compose(
  withData(authActions, mapAuthDataToProps),
  withInfoToast()
)(Receive);
