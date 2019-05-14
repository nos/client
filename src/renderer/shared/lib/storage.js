import storage from 'electron-json-storage';
import { promisify } from 'es6-promisify';
import { isEmpty } from 'lodash';

const get = promisify(storage.get, storage);
const set = promisify(storage.set, storage);

export const getStorage = async (key) => get(key);
export const setStorage = async (key, value) => set(key, value);
export const appendStorage = async (key, label, value) => {
  const values = await get(key);
  const newValue = values[label];

  if (!isEmpty(newValue)) {
    throw new Error(`Item with label ${label} already exists.`);
  }

  return set(key, { ...values, [label]: value });
};

export const updateStorage = async (key, label, value) => {
  const values = await get(key);
  const newValue = values[label];

  if (isEmpty(newValue)) {
    throw new Error(`Item with label ${label} doesn't exists.`);
  }

  return set(key, { ...values, [label]: value });
};
