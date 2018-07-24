import format from 'format-currency';
import { lowerCase } from 'lodash';

// Refer to https://www.npmjs.com/package/format-currency#usage when adding new currencies.
const FORMAT_OPTIONS = {
  usd: { format: '%s%v', code: 'USD', symbol: '$' }
};

function getFormatOptions(currency) {
  return FORMAT_OPTIONS[lowerCase(currency)] || FORMAT_OPTIONS.usd;
}

export default function formatCurrency(number, currency) {
  return format(number, getFormatOptions(currency));
}
