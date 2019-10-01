import { createActions } from 'spunky';
import { isEmpty, has } from 'lodash';

import { getStorage, setStorage } from 'shared/lib/storage';
import { THEMES, DEFAULT_THEME } from 'shared/values/themes';

export const ID = 'theme';

// Setters
export const setTheme = createActions(ID, (theme) => async () => {
  if (!has(THEMES, theme)) {
    throw new Error(`Invalid theme "${theme}".`);
  }

  // Set theme to dom
  document.documentElement.setAttribute('data-theme', theme);

  await setStorage(ID, theme);
  return theme;
});

// Getters
export default createActions(ID, () => async () => {
  const theme = await getStorage(ID);
  const selectedTheme = !isEmpty(theme) ? theme : DEFAULT_THEME;

  // Set theme to dom
  document.documentElement.setAttribute('data-theme', selectedTheme);

  return selectedTheme;
});
