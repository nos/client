import format from 'format-currency';

import { CAD, EUR, GBP, USD, DEFAULT_CURRENCY } from 'shared/values/currencies';

// Refer to https://www.npmjs.com/package/format-currency#usage when adding new currencies.
const FORMAT_OPTIONS = {
  [CAD]: { code: CAD, format: '%s%v', symbol: '$' },
  [EUR]: { code: EUR, format: '%s%v', symbol: '€', locale: 'en-GB' },
  [GBP]: { code: GBP, format: '%s%v', symbol: '£', locale: 'en-GB' },
  [USD]: { code: USD, format: '%s%v', symbol: '$' }
};

function getFormatOptions(currency) {
  return FORMAT_OPTIONS[currency] || FORMAT_OPTIONS[DEFAULT_CURRENCY];
}

export default function formatCurrency(number, currency) {
  return format(number, getFormatOptions(currency));
}
