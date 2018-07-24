import formatCurrency from 'account/util/formatCurrency';

describe('formatCurrency', () => {
  it('formats USD', () => {
    expect(formatCurrency('123456789.012', 'usd')).toEqual('$123,456,789.01');
  });
});
