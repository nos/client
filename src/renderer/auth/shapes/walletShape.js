import { string, number, shape, bool, objectOf, oneOfType } from 'prop-types';

export const walletShapeInitialized = shape({
  label: string.isRequired,
  canDelete: bool.isRequired,
  isHardware: bool.isRequired,
  index: number.isRequired,
  coinType: number.isRequired,
  account: number.isRequired,
  change: number.isRequired,
  net: string.isRequired,
  publicKey: string.isRequired,
  address: string.isRequired,
  privateKey: string.isRequired,
  WIF: string.isRequired
});

export const walletShapeNotInitialized = shape({
  label: string.isRequired,
  canDelete: bool.isRequired,
  isHardware: bool.isRequired,
  index: number.isRequired,
  coinType: number.isRequired,
  account: number.isRequired,
  change: number.isRequired,
  net: string.isRequired,
  publicKey: string.isRequired,
  address: string.isRequired
});

export default oneOfType([
  walletShapeInitialized,
  walletShapeNotInitialized
]);
