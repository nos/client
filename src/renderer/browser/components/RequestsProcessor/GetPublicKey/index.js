import { withCall, withData } from 'spunky';
import { compose } from 'recompose';

import authActions from 'login/actions/authActions';

import GetPublicKey from './GetPublicKey';
import withClean from '../../../hocs/withClean';
import withNullLoader from '../../../hocs/withNullLoader';

const mapAuthDataToProps = ({ wif }) => ({ wif });
const mapPublicKeyDataToProps = (publicKey) => ({ publicKey });

export default function makeGetPublicKey(publicKeyActions) {
  return compose(
    withClean(publicKeyActions),

    withData(authActions, mapAuthDataToProps),

    withCall(publicKeyActions, ({
      wif
    }) => ({
      wif
    })),
    withNullLoader(publicKeyActions),
    withData(publicKeyActions, mapPublicKeyDataToProps)
  )(GetPublicKey);
}
