import path from 'path';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.nodeRequire = require;
global.process.env.PUBLIC_PATH = path.join(__dirname, '../public');
