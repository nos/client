import { compose } from 'recompose';
import { withData } from 'spunky';

import withInitialCall from 'shared/hocs/withInitialCall';

import withClean from '../../../hocs/withClean';
import withNullLoader from '../../../hocs/withNullLoader';

import CurrentNetwork from './CurrentNetwork';

const mapCurrentNetworkActionsDataToProps = (data) => ({ data });

export default function makeGetPublicKey(currentNetworkActions) {
  return compose(
    withClean(currentNetworkActions),
    withInitialCall(currentNetworkActions),
    withNullLoader(currentNetworkActions),
    withData(currentNetworkActions, mapCurrentNetworkActionsDataToProps)
  )(CurrentNetwork);
}
