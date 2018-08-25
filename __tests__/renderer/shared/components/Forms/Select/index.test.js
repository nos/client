import React from 'react';
import { shallow } from 'enzyme';

import Select from 'shared/components/Forms/Select';

const mountContainer = (props = {}) => {
  return shallow(<Select {...props} />);
};

describe('<Select />', () => {
  it('renders a select', () => {
    const children = (
      <React.Fragment>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
      </React.Fragment>
    );
    const props = { id: 'name', defaultValue: 'foo', children };
    const wrapper = mountContainer(props);
    expect(wrapper.type()).toEqual('select');
    expect(wrapper.props()).toEqual(expect.objectContaining(props));
  });

  it('applies a custom className', () => {
    const wrapper = mountContainer({ className: 'currency' });
    expect(wrapper.prop('className').split(' ')).toContain('currency');
  });
});
