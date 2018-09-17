import validateInvokeArgs from 'browser/util/validateInvokeArgs';
import { NEO, GAS } from 'shared/values/assets';

describe('validateInvokeArgs', () => {
  const scriptHash = '85e9cc1f18fcebf9eb8211a128807e38d094542a';
  const operation = 'transfer';
  const assets = { [NEO]: '5', [GAS]: '5.00000001' };

  it('does not throw for valid arguments', () => {
    expect(() => validateInvokeArgs({ scriptHash, operation, assets })).not.toThrow();
  });

  it('does not throw for null assets', () => {
    expect(() => validateInvokeArgs({ scriptHash, operation, assets: null })).not.toThrow();
  });

  it('does not throw for undefined assets', () => {
    expect(() => validateInvokeArgs({ scriptHash, operation })).not.toThrow();
  });

  it('throws for invalid scriptHash', () => {
    expect(() => validateInvokeArgs({ scriptHash: 'bad', operation, assets })).toThrow(
      'Invalid script hash: "bad"'
    );
  });

  it('throws for invalid operation', () => {
    expect(() => validateInvokeArgs({ scriptHash, operation: '', assets })).toThrow(
      'Invalid operation: ""'
    );
  });

  it('throws for invalid assets type', () => {
    expect(() => validateInvokeArgs({ scriptHash, operation, assets: 5 })).toThrow(
      'Invalid assets: 5'
    );
  });

  it('throws for invalid assets shape', () => {
    expect(() => validateInvokeArgs({ scriptHash, operation, assets: { foo: 'bar' } })).toThrow(
      'Invalid assets: {"foo":"bar"}'
    );
  });
});
