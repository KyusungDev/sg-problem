import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './../index.css';

const InputForm = props => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const previousData = props.previousData;
    if (previousData.length !== 0) {
      setInput(previousData[0].text);
    }
  }, [props]);

  const handleInputChange = value => {
    props.onChange(props.itemId, [{ text: value }], value !== '');
  };

  return (
    <div>
      <div className="form-title">{props.title}</div>
      <div className="input-form">
        <form>
          <div>
            <input
              type="text"
              value={input}
              onChange={e => handleInputChange(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

InputForm.propTypes = {
  itemId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  formType: PropTypes.number.isRequired,
  options: PropTypes.array,
  previousData: PropTypes.array,
  onChange: PropTypes.func
};

InputForm.defaultProps = {
  options: [],
  previousData: [],
  onChange: () => {}
};

export default InputForm;
