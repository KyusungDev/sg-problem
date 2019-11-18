import React from 'react';
import { shallow } from 'enzyme';
import Stepper from '../components/Stepper';
import data from './../assets/input.json';

describe('Stepper Component', () => {
  let wrapper = shallow(
    <Stepper step={1}>
      {data.items.map(item => (
        <input key={item.itemId} type="text" value="입력"></input>
      ))}
    </Stepper>
  );

  it('is Step visible?', () => {
    expect(wrapper.find('Step').exists()).toBe(true);
    expect(wrapper.find('Step').length).toEqual(4);
  });

  it('is input visible?', () => {
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('input').length).toEqual(4);
  });

  it('is Header visible?', () => {
    expect(wrapper.find('Header').exists()).toBe(true);
  });
});
