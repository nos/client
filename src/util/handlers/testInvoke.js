import { get } from 'lodash';

export default async function testInvoke(store) {
  const state = store.getState();
  console.log('FULL STATE - testInvoke', state);
  return get(state, 'spunky.testinvoke.data.response') || '0';
}
