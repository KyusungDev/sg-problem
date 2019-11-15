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
  const [validation, setValidation] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    setTitle(data.title);
  }, [data]);

  const validate = () => {
    return validation[step];
  };

  const handleBackClick = () => setStep(Math.max(step - 1, 1));
  const handleNextClick = () => {
    if (validate()) {
      setStep(Math.min(step + 1, MAX_PAGE_LEN));
    } else {
      alert(MSG_REQUIRED);
    }
  };

  const handleChange = (step, id, data, result, formValidation) => {
    setAnswers({
      ...answers,
      [id]: {
        data,
        answer: result
      }
    });

    setValidation({
      ...validation,
      [step]: formValidation
    });
  };

  const handleSubmit = () => {
    if (!validate()) {
      alert(MSG_REQUIRED);
    }

    const items = [...Object.keys(answers)].map(key => ({
      id: key,
      answer: answers[key].answer
    }));

    const output = {
      id: data.formId,
      items: items
    };

    console.log(output);
  };

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
                previousData: answers[item.itemId]
                  ? answers[item.itemId].data
                  : undefined
              },
              (id, data, result, validation) =>
                handleChange(step, id, data, result, validation)
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
