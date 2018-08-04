import formatCurrency from 'account/util/formatCurrency';
import { CAD, GBP, EUR, USD } from 'shared/values/currencies';

describe('formatCurrency', () => {
  it('formats CAD', () => {
    expect(formatCurrency('123456789.012', CAD)).toEqual('$123,456,789.01');
  });

  it('formats EUR', () => {
    expect(formatCurrency('123456789.012', EUR)).toEqual('€123,456,789.01');
  });

  it('formats GBP', () => {
    expect(formatCurrency('123456789.012', GBP)).toEqual('£123,456,789.01');
  });

  it('formats USD', () => {
    expect(formatCurrency('123456789.012', USD)).toEqual('$123,456,789.01');
  });
});
