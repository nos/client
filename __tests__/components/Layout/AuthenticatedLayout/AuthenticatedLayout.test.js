import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import AuthenticatedLayout from '../../../../src/components/Layout/AuthenticatedLayout';
import { provideState } from '../../../testHelpers';

describe('<AuthenticatedLayout />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(provideState(<MemoryRouter><AuthenticatedLayout /></MemoryRouter>), div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
