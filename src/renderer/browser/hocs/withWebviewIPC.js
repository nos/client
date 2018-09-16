import { withProps } from 'recompose';
import { ipcRenderer } from 'electron';

const withWebviewIPC = withProps({
  onFocus: (id) => ipcRenderer.send('webview:focus', id)
});

export default withWebviewIPC;
