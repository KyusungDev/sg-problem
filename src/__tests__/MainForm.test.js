import React from 'react';
import { shallow } from 'enzyme';
import MainForm from '../views/MainForm';
import data from './../assets/input.json';

describe('MainForm Component', () => {
  let wrapper = shallow(<MainForm data={data}></MainForm>);

  it('is Mainform valid?', () => {
    expect(wrapper.find('Stepper').exists()).toBe(true);
    expect(wrapper.find('.main-title').exists()).toBe(true);
    expect(wrapper.find('.button-prev').exists()).toBe(true);
    expect(wrapper.find('.button-next').exists()).toBe(true);
    expect(wrapper.find('.submit').exists()).toBe(true);
  });
});
