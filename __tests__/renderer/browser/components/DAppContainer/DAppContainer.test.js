import React from 'react';
import { v1 as uuid } from 'uuid';
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
    requestCount: 1
  };

  const defaultProps = {
    sessionId: uuid(),
    tab: defaultTab,
    setTabTitle: noop,
    setTabTarget: noop,
    setTabIcon: noop,
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
