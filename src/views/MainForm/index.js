import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CheckboxForm, RadioForm, InputForm, SelectboxForm } from './../forms';
import Stepper from './../../components/Stepper';
import { MAX_PAGE_LEN, MSG_REQUIRED } from './../../constants';
import './index.css';

const formSwitcher = (type, props, onChange) =>
  ({
    1: <CheckboxForm {...props} onChange={onChange}></CheckboxForm>,
    2: <RadioForm {...props} onChange={onChange}></RadioForm>,
    3: <InputForm {...props} onChange={onChange}></InputForm>,
    4: <SelectboxForm {...props} onChange={onChange}></SelectboxForm>
  }[type]);

const MainForm = ({ data }) => {
  const [title, setTitle] = useState('');
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    setTitle(data.title);
  }, [data]);

  const handleChange = (step, id, data, formValidation) => {
    setAnswers({
      ...answers,
      [step]: {
        id,
        data,
        validation: formValidation
      }
    });
  };

  const handleBackClick = () => setStep(Math.max(step - 1, 1));
  const handleNextClick = () => {
    if (validate()) {
      setStep(Math.min(step + 1, MAX_PAGE_LEN));
    } else {
      alert(MSG_REQUIRED);
    }
  };

  const handleSubmit = () => {
    if (!validate()) {
      alert(MSG_REQUIRED);
    }

    const items = [...Object.keys(answers)].map(key => ({
      id: key,
      data: answers[key].data
    }));

    const output = {
      id: data.formId,
      items: items.map(item => ({
        id: item.id,
        text: item.data.map(item => item.text).join(',')
      }))
    };

    console.log(output);
  };

  const validate = () => (answers[step] ? answers[step].validation : false);

  return (
    <div className="main-form card">
      <div className="main-title">{title}</div>
      <Stepper step={step}>
        {data.items.map(item => (
          <Stepper.Step key={item.itemId}>
            {formSwitcher(
              item.formType,
              {
                ...item,
                previousData: answers[step] ? answers[step].data : []
              },
              (id, data, validation) => handleChange(step, id, data, validation)
            )}
          </Stepper.Step>
        ))}
      </Stepper>
      <div
        className="side-button button-prev"
        onClick={handleBackClick}
        disabled={step === 1}
      >
        {'<'}
      </div>
      <div
        className="side-button button-next"
        onClick={handleNextClick}
        disabled={step === MAX_PAGE_LEN}
      >
        {'>'}
      </div>
      <button
        onClick={handleSubmit}
        className={`submit ${step === MAX_PAGE_LEN ? '' : 'hidden'}`}
      >
        보내기
      </button>
    </div>
  );
};

MainForm.propTypes = {
  data: PropTypes.object
};

MainForm.defaultProps = {
  data: {}
};

export default MainForm;
