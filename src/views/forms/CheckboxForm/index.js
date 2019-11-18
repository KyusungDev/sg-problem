import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './../index.css';

const CheckboxForm = props => {
  const [checklist, setChecklist] = useState([]);

  useEffect(() => {
    const previousData = props.previousData;
    setChecklist(previousData);
  }, [props]);

  const handleCheckChange = (option, checked) => {
    const optionIndex = checklist.findIndex(item => item.id === option.id);
    if (optionIndex !== -1) {
      checklist[optionIndex] = { id: option.id, text: option.text, checked };
    } else {
      checklist.push({ id: option.id, text: option.text, checked });
    }

    const validation = checklist.some(item => item.checked);
    // const result = checklist
    //   .filter(item => item.checked)
    //   .map(item => props.options.find(o => o.id === item.id).text)
    //   .join();

    props.onChange(props.itemId, [...checklist], validation);
  };

  const isChecked = id => {
    const option = checklist.find(item => item.id === id);
    return option ? option.checked : false;
  };

  return (
    <div>
      <div className="form-title">{props.title}</div>
      <div className="checkbox-form">
        <form>
          {props.options.map(item => (
            <div key={item.id}>
              <label>
                <input
                  type="checkbox"
                  value={item.id}
                  checked={isChecked(item.id)}
                  onChange={e => handleCheckChange(item, e.target.checked)}
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

CheckboxForm.propTypes = {
  itemId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  formType: PropTypes.number.isRequired,
  options: PropTypes.array,
  previousData: PropTypes.any,
  onChange: PropTypes.func
};

CheckboxForm.defaultProps = {
  options: [],
  previousData: [],
  onChange: () => {}
};

export default CheckboxForm;
