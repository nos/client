import { isArray, isString, each } from 'lodash';
import { u } from '@cityofzion/neon-js';

const MAX_ITEMS = 16;

function validateHexString(str) {
  if (!u.isHex(str)) {
    throw new Error(`Invalid remark item ${str}, expected hex string.`);
  }
}

function validateArray(array) {
  const count = array.length;

  if (count > MAX_ITEMS) {
    throw new Error(`Remark of size ${count} exceed maximum size of ${MAX_ITEMS}.`);
  }

  each(array, validateHexString);
}

export default function validateRemark(obj) {
  if (!isArray(obj) && !isString(obj)) {
    throw new Error(`Invalid remark value ${obj}, expected string or array of hex strings.`);
  }

  if (isArray(obj)) {
    validateArray(obj);
  }
}
