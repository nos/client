import path from 'path';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Polyfill global defined by electron-webpack.
global.__static = path.join(__dirname, '..', 'static'); // eslint-disable-line no-underscore-dangle
