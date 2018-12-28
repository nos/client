import isValidAsset from 'browser/util/isValidAsset';
import { NEO, GAS } from 'shared/values/assets';

describe('isValidAsset', () => {
  it('returns true for valid NEO numeric values', () => {
    expect(isValidAsset(NEO, 5)).toBe(true);
  });

  it('returns true for valid NEO string values', () => {
    expect(isValidAsset(NEO, '5')).toBe(true);
  });

  it('returns true for valid GAS numeric values', () => {
    expect(isValidAsset(GAS, 5.1)).toBe(true);
  });

  it('returns true for valid GAS string values', () => {
    expect(isValidAsset(GAS, '5.10000000')).toBe(true);
  });

  it('returns false for invalid NEO values', () => {
    expect(isValidAsset(NEO, '5.1')).toBe(false);
  });

  it('returns false for invalid GAS values', () => {
    expect(isValidAsset(GAS, '5.123456789')).toBe(false);
  });

  it('returns false for invalid asset IDs', () => {
    expect(isValidAsset('abc123', '5')).toBe(false);
  });
});
