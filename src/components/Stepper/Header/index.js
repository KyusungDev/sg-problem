import React from 'react';
import PropTypes from 'prop-types';
import Circle from './../Circle';
import './index.css';

const Header = props => {
  return (
    <div className="stepper-header">
      {[...Array(props.size).keys()].map((item, i) => (
        <span key={i}>
          <Circle key={i} active={i + 1 === props.step}>
            {item}
          </Circle>
          {i + 1 < props.size && <Circle.Line></Circle.Line>}
        </span>
      ))}
    </div>
  );
};

Header.propTypes = {
  complete: PropTypes.string,
  step: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired
};

Header.defaultProps = {
  complete: ''
};

export default Header;
