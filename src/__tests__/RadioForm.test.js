import React from 'react';
import { shallow } from 'enzyme';
import RadioForm from '../views/forms/RadioForm';
import data from './../assets/input.json';

describe('RadioForm Component', () => {
  let wrapper = null;
  beforeEach(() => {
    const props = {
      itemId: data.items[1].itemId,
      title: data.items[1].title,
      formType: 2,
      options: data.items[1].options,
      previousData: [],
      onChange: jest.fn((id, state, formValidation) => {
        const text = state[0].text;
        expect(text).toEqual('30분');
        expect(formValidation).toBe(true);
      })
    };

    wrapper = shallow(<RadioForm {...props}></RadioForm>);
  });

  it('Change radio?', () => {
    expect(wrapper.find('input[type="radio"]').exists()).toBe(true);
    const radio = wrapper.find('input[type="radio"]').at(0);
    radio.selected = true;
    radio.simulate('change');
  });
});
