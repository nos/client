import decrypt from 'browser/util/decrypt';

describe('decrypt', () => {
  const iv = 'cd26ef7a70b1b3fcf54ef32394008db6';
  const mac = '39a9c5c682a1661c93b32983b70e5758a4bec0338fe2797758af7c45bf43002b';
  const wif = 'L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG';
  const data = 'ce7e03644b59757b66123e9a1dca172fb76c012b01f60572befb3563ec7b7b17';
  const senderPublicKey = '031d8e1630ce640966967bc6d95223d21f44304133003140c3b52004dc981349c9';

  describe('when given valid arguments', () => {
    it('returns a buffer', () => {
      expect(decrypt({ senderPublicKey, wif, iv, mac, data })).toBeInstanceOf(Buffer);
    });

    it('returns the decrypted value', () => {
      expect(decrypt({ senderPublicKey, wif, iv, mac, data })).toEqual(
        Buffer.from('This is a secret message!')
      );
    });
  });

  describe('when given an incorrect public key', () => {
    const incorrectPublicKey = '111111111111111111111111111111111111111111111111111111111111111111';

    it('throws an error', () => {
      expect(() => {
        decrypt({ senderPublicKey: incorrectPublicKey, wif, iv, mac, data });
      }).toThrowError(/Public key is not valid for specified curve/);
    });
  });

  describe('when given an invalid public key', () => {
    const invalidPublicKey = 'bad-value';

    it('throws an error', () => {
      expect(() => {
        decrypt({ senderPublicKey: invalidPublicKey, wif, iv, mac, data });
      }).toThrowError(/Public key is not valid for specified curve/);
    });
  });

  describe('when given an incorrect wif', () => {
    const incorrectWIF = 'KwRcRYJA1Gkj5y3JCRMbsdmwykL6A8uyaDT1vDWkDDR6iwz2MJFp';

    it('throws an error', () => {
      expect(() => {
        decrypt({ senderPublicKey, wif: incorrectWIF, iv, mac, data });
      }).toThrow('Bad MAC');
    });
  });

  describe('when given an invalid wif', () => {
    const invalidWIF = 'bad-value';

    it('throws an error', () => {
      expect(() => {
        decrypt({ senderPublicKey, wif: invalidWIF, iv, mac, data });
      }).toThrow('Invalid input: bad-value');
    });
  });

  describe('when given invalid data', () => {
    const invalidData = 'bad-value';

    it('throws an error', () => {
      expect(() => {
        decrypt({ senderPublicKey, wif, iv, mac, data: invalidData });
      }).toThrow('Bad MAC');
    });
  });
});
