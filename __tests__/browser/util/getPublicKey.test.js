import getPublicKey from 'browser/util/getPublicKey';

describe('getPublicKey', () => {
  it('returns the public key', () => {
    const wif = 'L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG';
    const expectedPublicKey = '031d8e1630ce640966967bc6d95223d21f44304133003140c3b52004dc981349c9';
    expect(getPublicKey(wif)).toEqual(expectedPublicKey);
  });
});
