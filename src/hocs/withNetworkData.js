import { withData } from 'spunky';

import currentNetworkActions, { getAllNetworks } from '../actions/settings/currentNetworkActions';

export default function withNetworkData(propName = 'net') {
  const mapSettingsDataToProps = (currentNetwork) => ({
    name: currentNetwork.name, [propName]: currentNetwork.neoscan
  });
  return withData(currentNetworkActions, mapSettingsDataToProps);
}

export function withAllNetworkData() {
  const mapSettingsDataToProps = (allNetworks) => ({ allNetworks });
  return withData(getAllNetworks, mapSettingsDataToProps);
}
