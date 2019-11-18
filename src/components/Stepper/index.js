import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Step from './Step';
import './index.css';

const Stepper = props => {
  // const size = props.children ? props.children.length : 0;
  const children = props.children || [];
  return (
    <div className="stepper">
      <Header size={children.length} step={props.step}></Header>
      {children.map((item, i) => (
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

Stepper.defaultProps = {
  step: 1
};

Stepper.Step = Step;

export default Stepper;
