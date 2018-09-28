import { wallet } from '@cityofzion/neon-js';

import authActions from 'login/actions/authActions';

describe('authActions', () => {
  describe('call', () => {
    const wif = 'KxB52D1FGe5xBn6YeezNwj7grhkHZxq7bv2tmaCPoT4rxApMwMvU';
    const address = 'ASJQLBnhAs6fSgBv2R7KtRZjC8A9fAmcNW';
    const privateKey = '1c7a992d0e68b7b23cb430ba596bd68cecde042410d81e9e95ee19dc1bcd739d';

    const itBehavesLikeAnActionResponse = (callback) => {
      it('returns an action object', () => {
        expect(authActions.call(callback())).toEqual({
          batch: false,
          type: 'auth/ACTION/CALL',
          meta: {
            id: 'auth',
            type: 'ACTION/CALL'
          },
          payload: {
            fn: expect.any(Function)
          }
        });
      });
    };

    describe('WIF authentication', () => {
      itBehavesLikeAnActionResponse(() => ({ wif }));

      describe('with valid WIF', () => {
        it('returns authenticated account data', async () => {
          const call = authActions.call({ wif });
          expect(await call.payload.fn({})).toEqual({ wif, address });
        });
      });
    });

    describe('private key authentication', () => {
      itBehavesLikeAnActionResponse(() => ({ wif: privateKey }));

      describe('with valid private key', () => {
        it('returns authenticated account data', async () => {
          const call = authActions.call({ wif: privateKey });
          expect(await call.payload.fn({})).toEqual({ wif, address });
        });
      });

      describe('with invalid private key', () => {
        it('throws an error', () => {
          expect.assertions(1);
          const call = authActions.call({ wif: 'invalid' });
          return expect(call.payload.fn({})).rejects.toEqual(
            new Error('That is not a valid private key.')
          );
        });
      });
    });

    describe('passphrase authentication', () => {
      const account = new wallet.Account(wif);
      const passphrase = 'valid';

      beforeAll(() => {
        account.encrypt(passphrase);
      });

      itBehavesLikeAnActionResponse(() => ({ encryptedWIF: account.encrypted, passphrase }));

      describe('with valid encrypted key & passphrase', () => {
        it('returns authenticated account data', async () => {
          const call = authActions.call({ encryptedWIF: account.encrypted, passphrase });
          expect(await call.payload.fn({})).toEqual({ wif, address });
        });
      });

      describe('with invalid encrypted key', () => {
        it('throws an error', () => {
          expect.assertions(1);
          const call = authActions.call({ encryptedWIF: 'invalid', passphrase });
          return expect(call.payload.fn({})).rejects.toEqual(
            new Error('That is not a valid encrypted key.')
          );
        });
      });

      describe('with invalid passphrase', () => {
        it('throws an error', () => {
          expect.assertions(1);
          const call = authActions.call({ encryptedWIF: account.encrypted, passphrase: 'invalid' });
          return expect(call.payload.fn({})).rejects.toEqual(
            new Error('Wrong Password or scrypt parameters!')
          );
        });
      });
    });
  });

  describe('cancel', () => {
    it('returns an action object', () => {
      expect(authActions.cancel()).toEqual({
        batch: false,
        type: 'auth/ACTION/CANCEL',
        meta: {
          id: 'auth',
          type: 'ACTION/CANCEL'
        }
      });
    });
  });

  describe('reset', () => {
    it('returns an action object', () => {
      expect(authActions.reset()).toEqual({
        batch: false,
        type: 'auth/ACTION/RESET',
        meta: {
          id: 'auth',
          type: 'ACTION/RESET'
        }
      });
    });
  });
});
