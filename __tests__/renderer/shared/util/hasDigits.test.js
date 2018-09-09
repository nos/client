import hasDigits from 'shared/util/hasDigits';

describe('hasDigits', () => {
  it('returns true if the number of digits matches', () => {
    expect(hasDigits('0.050', 2)).toBe(true);
  });

  it('returns true if the number of digits is lower', () => {
    expect(hasDigits('0.500', 2)).toBe(true);
  });

  it('returns false if the number of digits is higher', () => {
    expect(hasDigits('0.005', 2)).toBe(false);
  });
});
