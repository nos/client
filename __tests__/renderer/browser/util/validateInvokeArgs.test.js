import validateInvokeArgs from 'browser/util/validateInvokeArgs';
import { NEO, GAS } from 'shared/values/assets';

describe('validateInvokeArgs', () => {
  const scriptHash = '85e9cc1f18fcebf9eb8211a128807e38d094542a';
  const operation = 'transfer';
  const args = [];
  const assets = { [NEO]: '5', [GAS]: '5.00000001' };

  it('does not throw for valid arguments', () => {
    expect(() => validateInvokeArgs({ scriptHash, operation, args, assets })).not.toThrow();
  });

  it('does not throw for null assets', () => {
    expect(() => validateInvokeArgs({ scriptHash, operation, args, assets: null })).not.toThrow();
  });

  it('does not throw for undefined assets', () => {
    expect(() => validateInvokeArgs({ scriptHash, operation, args })).not.toThrow();
  });

  it('throws for invalid scriptHash', () => {
    expect(() => validateInvokeArgs({ scriptHash: 'bad', operation, args, assets })).toThrow(
      'Invalid script hash: "bad"'
    );
  });

  it('throws for invalid operation', () => {
    expect(() => validateInvokeArgs({ scriptHash, operation: '', args, assets })).toThrow(
      'Invalid operation: ""'
    );
  });

  it('throws for invalid args type', () => {
    expect(() => validateInvokeArgs({ scriptHash, operation, args: '', assets })).toThrow(
      'Invalid arguments: ""'
    );
  });

  it('throws for invalid assets type', () => {
    expect(() => validateInvokeArgs({ scriptHash, operation, args, assets: 5 })).toThrow(
      'Invalid assets: 5'
    );
  });

  it('throws for invalid assets shape', () => {
    expect(() =>
      validateInvokeArgs({ scriptHash, operation, args, assets: { foo: 'bar' } })
    ).toThrow('Invalid assets: {"foo":"bar"}');
  });
});
