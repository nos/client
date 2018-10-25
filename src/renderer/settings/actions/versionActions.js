import fetch from 'node-fetch';
import { createActions } from 'spunky';

export const VERSION_ID = 'version';

export default createActions(VERSION_ID, () => async () => {
  const response = await fetch('https://api.github.com/repos/nos/client/releases');
  const data = await response.json();
  const latest = data[0];

  if (!latest || !latest.tag_name) {
    throw new Error('Unable to retrieve latest version.');
  }

  return latest.tag_name;
});
