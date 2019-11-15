import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './../index.css';

const SelectboxForm = props => {
  const [select, setSelect] = useState('');

  useEffect(() => {
    const previousData = props.previousData || '';
    setSelect(previousData);
  }, [props]);

  const handleOptionChange = id => {
    const option = props.options.find(o => o.id === parseInt(id)) || {};
    props.onChange(props.itemId, option.id, option.text, true);
  };

  return (
    <div>
      <div className="form-title">{props.title}</div>
      <div className="selectbox-form">
        <form>
          <div>
            <select
              value={select}
              onChange={e => handleOptionChange(e.target.value)}
            >
              <option disabled></option>
              {props.options.map(item => (
                <option key={item.id} value={item.id}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

SelectboxForm.propTypes = {
  itemId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  formType: PropTypes.number.isRequired,
  options: PropTypes.array,
  previousData: PropTypes.any,
  onChange: PropTypes.func
};

SelectboxForm.defaultProps = {
  options: [],
  previousData: '',
  onChange: () => {}
};

export default SelectboxForm;