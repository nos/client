import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { provideState, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import AuthenticatedLayout from 'root/components/AuthenticatedLayout';
import { EXTERNAL } from 'browser/values/browserValues';

const initialState = {
  [spunkyKey]: {
    currentNetwork: mockSpunkyLoaded('MainNet'),
    auth: mockSpunkyLoaded({ address: 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s' })
  },
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
        addressBarEntry: true
      }
    }
  }
};

describe('<AuthenticatedLayout />', () => {
  it('renders without crashing', () => {
    mount(
      provideState(
        <MemoryRouter>
          <AuthenticatedLayout />
        </MemoryRouter>,
        initialState
      )
    );
  });
});
