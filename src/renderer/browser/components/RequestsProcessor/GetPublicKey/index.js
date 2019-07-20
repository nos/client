import { withData } from 'spunky';
import { compose } from 'recompose';

import authActions from 'auth/actions/authActions';
import withInitialCall from 'shared/hocs/withInitialCall';

import GetPublicKey from './GetPublicKey';
import withClean from '../../../hocs/withClean';
import withNullLoader from '../../../hocs/withNullLoader';

const mapAuthDataToProps = ({ wif }) => ({ wif });
const mapPublicKeyDataToProps = (publicKey) => ({ publicKey });

export default function makeGetPublicKey(publicKeyActions) {
  return compose(
    withClean(publicKeyActions),

    withData(authActions, mapAuthDataToProps),

    withInitialCall(publicKeyActions, ({ wif }) => ({ wif })),
    withNullLoader(publicKeyActions),
    withData(publicKeyActions, mapPublicKeyDataToProps)
  )(GetPublicKey);
}
