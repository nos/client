import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { provideState } from 'testHelpers';

import AuthenticatedLayout from 'root/components/AuthenticatedLayout';
import { EXTERNAL } from 'browser/values/browserValues';

const initialState = {
  browser: {
    currentNetwork: 'MainNet',
    activeSessionId: 'tab-1',
    tabs: {
      'tab-1': {
        type: EXTERNAL,
        title: 'My nOS',
        target: 'https://my.nos.app',
        loading: false,
        requestCount: 1,
        addressBarEntry: true,
        errorCode: null,
        errorDescription: null
      }
    }
  }
};

describe('<AuthenticatedLayout />', () => {
  it('renders without crashing', () => {
    mount(provideState(<MemoryRouter><AuthenticatedLayout /></MemoryRouter>, initialState));
  });
});
