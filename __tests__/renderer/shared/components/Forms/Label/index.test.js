import React from 'react';
import { shallow } from 'enzyme';

import Label from 'shared/components/Forms/Label';

const mountContainer = (props = {}) => {
  return shallow(<Label {...props} />);
};

describe('<Label />', () => {
  it('renders a label', () => {
    const wrapper = mountContainer({ label: 'Name', htmlFor: 'name' });
    expect(wrapper.type()).toEqual('label');
    expect(wrapper.props()).toEqual(expect.objectContaining({ htmlFor: 'name' }));
    expect(wrapper.text()).toEqual('Name');
  });

  it('applies a custom className', () => {
    const wrapper = mountContainer({ label: 'Name', className: 'green' });
    expect(wrapper.prop('className').split(' ')).toContain('green');
  });
});
