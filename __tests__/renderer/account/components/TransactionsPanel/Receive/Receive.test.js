import React from 'react';
import { mount } from 'enzyme';

import Receive from 'account/components/TransactionsPanel/Receive/Receive';

const address = 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s';
const defaultProps = { address };

const mountContainer = (props = {}) => {
  return mount(<Receive {...defaultProps} {...props} />);
};

describe('<Receive />', () => {
  it('renders the address', () => {
    const wrapper = mountContainer();
    expect(wrapper.find('.address').text()).toEqual(address);
  });
});
