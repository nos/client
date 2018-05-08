import { withData } from 'spunky';

import getAllNetworks from 'settings/actions/networksActions';

export default function withAllNetworkData() {
  const mapSettingsDataToProps = (allNetworks) => ({ allNetworks });
  return withData(getAllNetworks, mapSettingsDataToProps);
}
