import React from 'react';
import { mount } from 'enzyme';

import LabeledSelect from 'shared/components/Forms/LabeledSelect';
import Label from 'shared/components/Forms/Label';
import Select from 'shared/components/Forms/Select';

const mountContainer = (props = {}) => {
  return mount(<LabeledSelect {...props} />);
};

describe('<LabeledSelect />', () => {
  it('renders a label', () => {
    const wrapper = mountContainer({ id: 'currency', label: 'Currency' });
    const label = wrapper.find(Label);
    expect(label.exists()).toBe(true);
    expect(label.props()).toEqual(
      expect.objectContaining({ label: 'Currency', htmlFor: 'currency' })
    );
  });

  it('renders a select', () => {
    const children = (
      <React.Fragment>
        <option value="USD">United States Dollar</option>
        <option value="EUR">Euro</option>
      </React.Fragment>
    );
    const wrapper = mountContainer({ id: 'currency', label: 'Currency', children });
    const select = wrapper.find(Select);
    expect(select.exists()).toBe(true);
    expect(select.props()).toEqual(expect.objectContaining({ id: 'currency', children }));
  });
});
