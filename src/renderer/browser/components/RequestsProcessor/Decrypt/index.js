import { withCall, withData } from 'spunky';
import { compose, withProps } from 'recompose';
import { pick } from 'lodash';

import authActions from 'login/actions/authActions';

import Decrypt from './Decrypt';
import withClean from '../../../hocs/withClean';
import withNullLoader from '../../../hocs/withNullLoader';
import withRejectMessage from '../../../hocs/withRejectMessage';

const mapAuthDataToProps = ({ wif }) => ({ wif });
const mapDecryptDataToProps = (data) => ({ data });

const CONFIG_KEYS = ['senderPublicKey', 'iv', 'mac', 'data'];

export default function makeDecrypt(decryptActions) {
  return compose(
    withClean(decryptActions),

    withProps(({ args }) => pick(args[0], CONFIG_KEYS)),

    withData(authActions, mapAuthDataToProps),

    withCall(decryptActions, ({ senderPublicKey, wif, iv, mac, data }) => ({
      senderPublicKey,
      wif,
      iv,
      mac,
      data
    })),
    withNullLoader(decryptActions),
    withRejectMessage(decryptActions, 'Decryption failed.'),
    withData(decryptActions, mapDecryptDataToProps)
  )(Decrypt);
}
