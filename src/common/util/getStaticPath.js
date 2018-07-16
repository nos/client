import path from 'path';
import isDev from 'electron-is-dev';

export default function getStaticPath() {
  if (isDev) {
    // The `__static` global doesn't match what it should in development.  Instead, it includes an
    // unexpected `node_modules` path, specifically:
    // node_modules/electron/dist/Electron.app/Contents/Resources/static
    return path.join(__dirname, '..', '..', 'static');
  } else {
    // The `__static` global doesn't match what it should in production.  There's a long outstanding
    // open issue related to it.  What's interesting is that nOS's `__static` value is even
    // different than what users in this issue are reporting.  This workaround addresses it for now.
    // https://github.com/electron-userland/electron-webpack/issues/52
    return path.join(__dirname, 'static');
  }
}
