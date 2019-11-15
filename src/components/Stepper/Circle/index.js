import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Line = () => {
  return (
    <span
      style={{
        width: '20px',
        height: '6px',
        borderTop: '1px dashed #868e96',
        display: 'inline-block',
        marginLeft: '5px',
        marginRight: '5px'
      }}
    ></span>
  );
};

const Circle = props => {
  return (
    <span
      className="circle"
      style={{
        backgroundColor: props.active ? '#339af0' : '#868e96'
      }}
    ></span>
  );
};

Circle.Line = Line;

Circle.propTypes = {
  active: PropTypes.bool
};

Circle.defaultProps = {
  active: false
};

export default Circle;
