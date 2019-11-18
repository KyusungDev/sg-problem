import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CheckboxForm, RadioForm, InputForm, SelectForm } from './../forms';
import Stepper from './../../components/Stepper';
import { MSG_REQUIRED } from './../../constants';
import './index.css';

const formSwitcher = (key, type, props, onChange) =>
  ({
    1: <CheckboxForm key={key} {...props} onChange={onChange}></CheckboxForm>,
    2: <RadioForm key={key} {...props} onChange={onChange}></RadioForm>,
    3: <InputForm key={key} {...props} onChange={onChange}></InputForm>,
    4: <SelectForm key={key} {...props} onChange={onChange}></SelectForm>
  }[type]);

const MainForm = ({ data }) => {
  const [doc, setDoc] = useState({
    id: '',
    title: '',
    forms: [],
    formCount: 0
  });
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    setDoc({
      id: data.formId,
      title: data.title,
      forms: data.items,
      formCount: data.items.length
    });
  }, [data]);

  const handleChange = (step, id, state, formValidation) => {
    setAnswers({
      ...answers,
      [step]: {
        id,
        state,
        validation: formValidation
      }
    });
  };

  const handleBackClick = () => setStep(Math.max(step - 1, 1));
  const handleNextClick = () => {
    if (validate()) {
      setStep(Math.min(step + 1, doc.formCount));
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
      state: answers[key].state
    }));

    const output = {
      id: doc.id,
      items: items.map(item => ({
        id: item.id,
        answer: item.state.map(item => item.text).join(',')
      }))
    };

    console.log(output);
    console.log('output.json', JSON.stringify(output));
  };

  const validate = () => (answers[step] ? answers[step].validation : false);

  return (
    <div className="main-form card">
      <div className="main-title">{doc.title}</div>
      <Stepper step={step}>
        {doc.forms.map((item, index) =>
          formSwitcher(
            index,
            item.formType,
            {
              ...item,
              previousData: answers[step] ? answers[step].state : []
            },
            (id, state, validation) => handleChange(step, id, state, validation)
          )
        )}
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
        disabled={step === doc.formCount}
      >
        {'>'}
      </div>
      <button
        onClick={handleSubmit}
        className={`submit ${step === doc.formCount ? '' : 'hidden'}`}
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
