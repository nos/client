import { keys } from 'lodash';

import encrypt from 'browser/util/encrypt';

describe('encrypt', () => {
  const iv = 'cd26ef7a70b1b3fcf54ef32394008db6';
  const wif = 'L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG';
  const data = 'This is a secret message!';
  const ivProvider = jest.fn(() => Buffer.from(iv, 'hex'));

  describe('when given a valid public key', () => {
    const recipientPublicKey = '031a6c6fbbdf02ca351745fa86b9ba5a9452d785ac4f7fc2b7548ca2a46c4fcf4a';

    it('returns an object containing iv, mac, and data', () => {
      const result = encrypt({ recipientPublicKey, wif, data, ivProvider });
      expect(keys(result)).toEqual(['iv', 'mac', 'data']);
    });

    it('includes the iv', () => {
      const { iv: generatedIV } = encrypt({ recipientPublicKey, wif, data, ivProvider });
      expect(generatedIV).toEqual(iv);
    });

    it('includes the encrypted data', () => {
      const { mac } = encrypt({ recipientPublicKey, wif, data, ivProvider });
      expect(mac).toEqual('a92b6ea8fafd5ce64f344279aba7cb9a9cd2c3a5996eb60d77d8d16560159975');
    });

    it('includes the encrypted data', () => {
      const { data: encryptedData } = encrypt({ recipientPublicKey, wif, data, ivProvider });
      expect(encryptedData).toEqual('6e4444c8928cffec1f36fd7eec78ac145040cf11eb10a72091483ef0477ad444');
    });
  });

  describe('when given an invalid public key', () => {
    const recipientPublicKey = '111111111111111111111111111111111111111111111111111111111111111111';

    it('throws an error', () => {
      expect(() => {
        encrypt({ recipientPublicKey, wif, data, ivProvider });
      }).toThrow('Failed to translate Buffer to a EC_POINT');
    });
  });
});
