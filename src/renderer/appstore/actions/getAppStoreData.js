import fetch from 'node-fetch';
import { createActions } from 'spunky';

async function getAppStoreData() {
  const apps = await (await fetch('https://nos.app/api/v1/app/index')).json();

  const categories = apps.reduce((accumulator, app) => {
    const { category } = app;
    if (!accumulator.includes(category)) return [...accumulator, category];
    return accumulator;
  }, []);

  return { apps, categories };
}

export const ID = 'appstore';

export default createActions(ID, () => {
  return () => getAppStoreData();
});
