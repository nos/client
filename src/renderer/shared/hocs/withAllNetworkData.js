import { withData } from 'spunky';

import getAllNetworks from 'settings/actions/networksActions';

export default function withAllNetworkData() {
  const mapSettingsDataToProps = (networks) => ({ networks });
  return withData(getAllNetworks, mapSettingsDataToProps);
}
