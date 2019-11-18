import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './../index.css';

const SelectForm = props => {
  const [select, setSelect] = useState('');

  useEffect(() => {
    const previousData = props.previousData;
    if (previousData.length !== 0) {
      setSelect(previousData[0].id);
    }
  }, [props]);

  const handleOptionChange = id => {
    const option = props.options.find(o => o.id === parseInt(id)) || {};
    props.onChange(props.itemId, [{ id: option.id, text: option.text }], true);
  };

  return (
    <div>
      <div className="form-title">{props.title}</div>
      <div className="select-form">
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

SelectForm.propTypes = {
  itemId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  formType: PropTypes.number.isRequired,
  options: PropTypes.array,
  previousData: PropTypes.array,
  onChange: PropTypes.func
};

SelectForm.defaultProps = {
  options: [],
  previousData: [],
  onChange: () => {}
};

export default SelectForm;
