import { withData } from 'spunky';

import currentNetworkActions, { getAllNetworks } from '../actions/settings/currentNetworkActions';

export default function withNetworkData(propName = 'net') {
  const mapSettingsDataToProps = (currentNetwork) => ({
    [propName]: currentNetwork
  });
  return withData(currentNetworkActions, mapSettingsDataToProps);
}

export function withAllNetworkData() {
  const mapSettingsDataToProps = (allNetworks) => ({ allNetworks });
  return withData(getAllNetworks, mapSettingsDataToProps);
}
