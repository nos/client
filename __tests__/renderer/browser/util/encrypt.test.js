import { keys } from 'lodash';

import encrypt from 'browser/util/encrypt';

describe('encrypt', () => {
  const iv = 'cd26ef7a70b1b3fcf54ef32394008db6';
  const wif = 'L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG';
  const data = 'This is a secret message!';
  const ivProvider = jest.fn(() => Buffer.from(iv, 'hex'));

  describe('when given a valid public key', () => {
    const recipientPublicKey = '031d8e1630ce640966967bc6d95223d21f44304133003140c3b52004dc981349c9';

    it('returns an object containing iv, mac, and data', () => {
      const result = encrypt({ recipientPublicKey, wif, data, ivProvider });
      expect(keys(result)).toEqual(['iv', 'mac', 'data']);
    });

    it('includes the iv', () => {
      const { iv: generatedIV } = encrypt({ recipientPublicKey, wif, data, ivProvider });
      expect(generatedIV).toEqual(iv);
    });

    it('includes the mac', () => {
      const { mac } = encrypt({ recipientPublicKey, wif, data, ivProvider });
      expect(mac).toEqual('39a9c5c682a1661c93b32983b70e5758a4bec0338fe2797758af7c45bf43002b');
    });

    it('includes the encrypted data', () => {
      const { data: encryptedData } = encrypt({ recipientPublicKey, wif, data, ivProvider });
      expect(encryptedData).toEqual('ce7e03644b59757b66123e9a1dca172fb76c012b01f60572befb3563ec7b7b17');
    });
  });

  describe('when given an invalid public key', () => {
    const recipientPublicKey = '111111111111111111111111111111111111111111111111111111111111111111';

    it('throws an error', () => {
      expect(() => {
        encrypt({ recipientPublicKey, wif, data, ivProvider });
      }).toThrowError(/Public key is not valid for specified curve/);
    });
  });
});
