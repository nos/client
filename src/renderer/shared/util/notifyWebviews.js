import { remote } from 'electron';

const TYPE_WEBVIEW = 'webview';

function getAllWebviews() {
  const webContents = remote.webContents.getAllWebContents();
  return webContents.filter((wc) => wc.getType() === TYPE_WEBVIEW);
}

export default function notifyWebviews(...args) {
  getAllWebviews().forEach((webview) => webview.send(...args));
}
