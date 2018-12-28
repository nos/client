import { number, string, objectOf, oneOfType } from 'prop-types';

export default objectOf(oneOfType([number, string]));
