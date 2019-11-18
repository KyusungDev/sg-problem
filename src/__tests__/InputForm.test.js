import React from 'react';
import { shallow } from 'enzyme';
import InputForm from '../views/forms/InputForm';
import data from './../assets/input.json';

describe('InputForm Component', () => {
  let wrapper = null;
  beforeEach(() => {
    const props = {
      itemId: data.items[2].itemId,
      title: data.items[2].title,
      formType: 3,
      options: [],
      previousData: [],
      onChange: jest.fn((id, state, formValidation) => {
        const text = state[0].text;
        expect(text === '' && formValidation === false).toBe(true);
      })
    };

    wrapper = shallow(<InputForm {...props}></InputForm>);
  });

  it('Chagne input?', () => {
    expect(wrapper.find('input').exists()).toBe(true);
    wrapper.find('input').simulate('change', {
      target: {
        value: ''
      }
    });
  });
});
