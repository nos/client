import path from 'path';
import test from 'ava';
import electron from 'electron';
import { Application } from 'spectron';

const appPath = path.join(__dirname, '..');

const app = new Application({
  path: electron,
  args: [appPath],
  env: { NODE_ENV: 'test' }
});

test.before(async () => {
  await app.start();
  const handles = await app.client.windowHandles();

  console.log('windows:', await app.client.getWindowCount());
  const win2 = await (await app.client.window(handles.value[1])).getTitle();
  const title2 = await win2.getTitle();
  console.log('title:', title2);

  await app.client.waitUntilWindowLoaded();
});

test.after(async () => {
  if (app && app.isRunning()) {
    await app.stop();
  }
});

test.serial('should run the app', async (t) => {
  t.true(app.browserWindow.isVisible());
  t.true(app.client.getTitle() === 'My App');
});
