import { get } from 'lodash';

export default async function getAddress(store) {
  const state = store.getState();
  return get(state, 'spunky.auth.data.address');
}
