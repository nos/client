import { withData } from 'spunky';

import getAllNetworks from '../actions/settings/networksActions';

export default function withAllNetworkData() {
  const mapSettingsDataToProps = (allNetworks) => ({ allNetworks });
  return withData(getAllNetworks, mapSettingsDataToProps);
}
