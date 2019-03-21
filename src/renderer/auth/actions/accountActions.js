import { createActions } from 'spunky';
import { isEmpty } from 'lodash';
import bip39 from 'bip39';

import simpleEncrypt from 'shared/util/simpleEncrypt';
import PROFILE_ID, { DEFAULT_ACC_INDEX } from 'shared/values/profile';
import { getStorage, setStorage, appendStorage } from 'shared/lib/storage';
import { DEFAULT_NET } from 'values/networks';
import { DEFAULT_FEE } from 'shared/values/fees';
import { DEFAULT_CURRENCY } from 'shared/values/currencies';
import { DEFAULT_LANGUAGE } from 'shared/values/languages';
import { DEFAULT_CHAIN } from 'shared/values/chains';

const MIN_PASSPHRASE_LEN = 1; // TODO set to 7

export const ID = 'account';

// Getters
export default createActions(ID, () => async () => {
  return getStorage(ID);
});

// Append
export const appendAccount = createActions(ID, () => async () => {
  return appendStorage(ID);
});
