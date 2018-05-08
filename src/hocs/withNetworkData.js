import { withData } from 'spunky';

import currentNetworkActions from '../actions/settings/currentNetworkActions';

export default function withNetworkData(propName = 'net') {
  const mapSettingsDataToProps = (currentNetwork) => ({
    [propName]: currentNetwork
  });
  return withData(currentNetworkActions, mapSettingsDataToProps);
}
