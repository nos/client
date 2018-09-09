import hasDigits from 'shared/util/hasDigits';
import { ASSETS } from 'shared/values/assets';

export default function isValidAsset(assetId, amount = 0) {
  const asset = ASSETS[assetId];

  if (!asset) {
    return false;
  }

  if (!hasDigits(amount, asset.decimals)) {
    return false;
  }

  return true;
}
