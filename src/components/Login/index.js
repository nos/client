import { withProps } from 'recompose';

import Login from './Login';
import electron from '../../lib/electron';

const { ipcRenderer: ipc } = electron;

export default withProps({
  onLogin: (wif) => {
    ipc.send('login', { wif });
    alert(`Logged in as ${wif}.`); // eslint-disable-line no-alert
  }
})(Login);
