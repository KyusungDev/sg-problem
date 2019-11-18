import React from 'react';
import { shallow } from 'enzyme';
import CheckboxForm from '../views/forms/CheckboxForm';
import data from './../assets/input.json';

describe('CheckboxForm Component', () => {
  let wrapper = null;
  beforeEach(() => {
    const props = {
      itemId: data.items[0].itemId,
      title: data.items[0].title,
      formType: 1,
      options: data.items[0].options,
      previousData: [],
      onChange: jest.fn((id, state, formValidation) => {
        expect(formValidation).toBe(true);
      })
    };

    wrapper = shallow(<CheckboxForm {...props}></CheckboxForm>);
  });

  it('Change checkbox?', () => {
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    const checkbox = wrapper.find('input[type="checkbox"]').at(0);
    checkbox.selected = true;
    checkbox.simulate('change', { target: { checked: true } });
  });
});
