import path from 'path';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { noop } from 'lodash';

configure({ adapter: new Adapter() });

// Polyfill global defined by electron-webpack.
global.__static = path.join(__dirname, '..', 'static'); // eslint-disable-line no-underscore-dangle

// Polyfill window prompts to always confirm.  Needed for react-copy-to-clipboard to work.
global.prompt = () => true;

// Polyfill text selection functionality.  Needed for react-copy-to-clipboard to work.  Can remove
// this once https://github.com/jsdom/jsdom/issues/317 is implemented.
const getSelection = () => ({
  rangeCount: 0,
  addRange: noop,
  getRangeAt: noop,
  removeAllRanges: noop
});

window.getSelection = getSelection;
document.getSelection = getSelection;

process.on('unhandledRejection', (error) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled promise rejection:', error.stack);
});
