import getRandomIV from 'browser/util/getRandomIV';

describe('getRandomIV', () => {
  it('returns a 16-byte string', () => {
    expect(getRandomIV().length).toBe(16);
  });

  it('returns different values on subsequent calls', () => {
    expect(getRandomIV()).not.toEqual(getRandomIV());
  });
});
