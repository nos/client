import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded } from 'testHelpers';

import makeGetAddress from 'browser/components/RequestsProcessor/GetAddress';

const address = 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s';

const getStore = () =>
  createStore({
    [spunkyKey]: {
      auth: mockSpunkyLoaded({
        address,
        wif: 'L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG'
      })
    }
  });

describe('<GetBalance />', () => {
  let onResolve;
  let onReject;

  const GetAddress = makeGetAddress();
  const defaultProps = { args: [], onResolve: noop, onReject: noop };

  const mountContainer = (props) => {
    return mount(provideStore(<GetAddress {...props} />, getStore()));
  };

  beforeEach(() => {
    onResolve = jest.fn();
    onReject = jest.fn();
    mountContainer({ ...defaultProps, onResolve, onReject });
  });

  it('resolves with the currently authenticated address', () => {
    expect(onResolve).toHaveBeenCalledWith(address);
    expect(onReject).not.toHaveBeenCalled();
  });
});
