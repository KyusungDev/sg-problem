import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './../index.css';

const RadioForm = props => {
  const [select, setSelect] = useState('');

  useEffect(() => {
    const previousData = props.previousData;
    if (previousData.length !== 0) {
      setSelect(previousData[0].id);
    }
  }, [props]);

  const handleOptionChange = option => {
    props.onChange(props.itemId, [{ id: option.id, text: option.text }], true);
  };

  return (
    <div>
      <div className="form-title">{props.title}</div>
      <div className="radio-form">
        <form>
          {props.options.map(item => (
            <div key={item.id}>
              <label>
                <input
                  type="radio"
                  name="radio-button"
                  value={item.text}
                  checked={select === item.id}
                  onChange={e => handleOptionChange(item)}
                />
                {item.text}
              </label>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

RadioForm.propTypes = {
  itemId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  formType: PropTypes.number.isRequired,
  options: PropTypes.array,
  previousData: PropTypes.array,
  onChange: PropTypes.func
};

RadioForm.defaultProps = {
  options: [],
  previousData: [],
  onChange: () => {}
};

export default RadioForm;
