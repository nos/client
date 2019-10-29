import { ARK } from 'shared/values/coins';

import { ARK_NETWORKS } from '../../../../common/values/networks';

export default function getNetwork({ coinType, net }) {
  switch (coinType) {
    case ARK:
      return ARK_NETWORKS[net];
    default:
      throw new Error('No supported coin selected');
  }
}
