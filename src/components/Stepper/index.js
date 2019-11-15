import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Step from './Step';
import './index.css';

const Stepper = props => {
  const size = props.children.length;
  return (
    <div className="stepper">
      <Header size={size} step={props.step}></Header>
      {props.children.map((item, i) => (
        <Step key={i} visible={props.step === i + 1}>
          {item}
        </Step>
      ))}
    </div>
  );
};

Stepper.propTypes = {
  step: PropTypes.number
};

Stepper.Step = Step;

export default Stepper;
