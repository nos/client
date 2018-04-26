import { withData } from 'spunky';

import currentNetworkActions, { getAllNetworks } from '../actions/settings/currentNetworkActions';

export default function withNetworkData(propName = 'net') {
  console.log('withNetworkData');
  const mapSettingsDataToProps = (currentNetwork) => ({ name: currentNetwork.name, [propName]: currentNetwork.neoscan });
  return withData(currentNetworkActions, mapSettingsDataToProps);
}

export function withAllNetworkData(propName = 'net') {
  console.log('withAllNetworkData');
  const mapSettingsDataToProps = (networks) => ({ allNetworks: networks });
  return withData(getAllNetworks, mapSettingsDataToProps);
}
