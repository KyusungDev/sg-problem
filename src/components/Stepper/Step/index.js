import React from 'react';
import PropTypes from 'prop-types';

const Step = props => {
  return props.visible ? <>{props.children}</> : <></>;
};

Step.propTypes = {
  visible: PropTypes.bool
};

Step.defaultProps = {
  visible: true
};

export default Step;
