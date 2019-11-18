import React from 'react';
import { shallow } from 'enzyme';
import SelectForm from '../views/forms/SelectForm';
import data from './../assets/input.json';

describe('SelectForm Component', () => {
  let wrapper = null;
  beforeEach(() => {
    const props = {
      itemId: data.items[3].itemId,
      title: data.items[3].title,
      formType: 4,
      options: data.items[3].options,
      previousData: [],
      onChange: jest.fn((id, state, formValidation) => {
        expect(formValidation).toBe(true);
      })
    };

    wrapper = shallow(<SelectForm {...props}></SelectForm>);
  });

  it('Change select?', () => {
    expect(wrapper.find('select').exists()).toBe(true);
    wrapper
      .find('select')
      .find('option')
      .at(0)
      .simulate('click');

    wrapper.find('select').simulate('change', { target: { value: 6 } });
  });
});
