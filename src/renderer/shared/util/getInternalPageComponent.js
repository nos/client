import { ACCOUNT, SETTINGS } from 'browser/values/browserValues';

const PAGE_COMPONENTS = {
  [ACCOUNT]: async () => {
    const { Account } = await import('account');
    return Account;
  },
  [SETTINGS]: async () => {
    const { Settings } = await import('settings');
    return Settings;
  }
};

export default async function getInternalPageComponent(target) {
  const importComponent = PAGE_COMPONENTS[target];
  return importComponent && importComponent();
}
