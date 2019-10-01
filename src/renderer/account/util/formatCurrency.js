import format from 'format-currency';
import { mapValues } from 'lodash';

import { CAD, EUR, GBP, USD, SYMBOLS, DEFAULT_CURRENCY } from 'shared/values/currencies';

// Refer to https://www.npmjs.com/package/format-currency#usage when adding new currencies.
const FORMAT_OPTIONS = mapValues(
  {
    [CAD]: { format: '%s%v' },
    [EUR]: { format: '%s%v', locale: 'en-GB' },
    [GBP]: { format: '%s%v', locale: 'en-GB' },
    [USD]: { format: '%s%v' }
  },
  (options, code) => ({ ...options, code, symbol: SYMBOLS[code] })
);

function getFormatOptions(currency) {
  return FORMAT_OPTIONS[currency] || FORMAT_OPTIONS[DEFAULT_CURRENCY];
}

export default function formatCurrency(number, currency) {
  return format(number, getFormatOptions(currency));
}
