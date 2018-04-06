import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import App from '../../../src/components/App';
import { provideState } from '../../testHelpers';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(provideState(<MemoryRouter><App /></MemoryRouter>), div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
