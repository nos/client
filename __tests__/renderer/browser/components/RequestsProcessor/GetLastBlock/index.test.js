import React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash';

import { provideStore, createStore, spunkyKey, mockSpunkyLoaded } from 'testHelpers';
import block from 'fixtures/block.json';

import makeGetLastBlock from 'browser/components/RequestsProcessor/GetLastBlock';

const getStore = () =>
  createStore({
    [spunkyKey]: {
      block: mockSpunkyLoaded(block)
    }
  });

describe('<GetLastBlock />', () => {
  let onResolve;
  let onReject;

  const GetLastBlock = makeGetLastBlock();
  const defaultProps = { args: [], onResolve: noop, onReject: noop };

  const mountContainer = (props) => {
    return mount(provideStore(<GetLastBlock {...props} />, getStore()));
  };

  beforeEach(() => {
    onResolve = jest.fn();
    onReject = jest.fn();
    mountContainer({ ...defaultProps, onResolve, onReject });
  });

  it('resolves with the last block', () => {
    expect(onResolve).toHaveBeenCalledWith(block);
    expect(onReject).not.toHaveBeenCalled();
  });
});
