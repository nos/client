import React from 'react';
import uuid from 'uuid/v1';
import { shallow } from 'enzyme';
import { noop } from 'lodash';

import DAppContainer from 'browser/components/DAppContainer/DAppContainer';
import { EXTERNAL } from 'browser/values/browserValues';

describe('<DAppContainer />', () => {
  const defaultTab = {
    type: EXTERNAL,
    target: 'https://my.nos.app',
    title: 'My nOS',
    addressBarEntry: true,
    loading: false,
    requestCount: 1,
    errorCode: null,
    errorDescription: null
  };

  const defaultProps = {
    sessionId: uuid(),
    tab: defaultTab,
    setTabError: noop,
    setTabTitle: noop,
    setTabTarget: noop,
    setTabLoaded: noop,
    enqueue: noop,
    dequeue: noop,
    empty: noop,
    openTab: noop,
    closeTab: noop
  };

  const mountContainer = (props = {}) => {
    return shallow(<DAppContainer {...defaultProps} {...props} />);
  };

  it('renders a webview', () => {
    const wrapper = mountContainer();
    expect(wrapper.find('webview').prop('src')).toEqual(defaultProps.target);
  });
});
