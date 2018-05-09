import { withData } from 'spunky';

import currentNetworkActions from 'settings/actions/currentNetworkActions';

export default function withNetworkData(propName = 'net') {
  const mapSettingsDataToProps = (currentNetwork) => ({
    [propName]: currentNetwork
  });
  return withData(currentNetworkActions, mapSettingsDataToProps);
}
