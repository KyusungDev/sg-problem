import React from 'react';
import './App.css';
import data from './assets/input.json';
import MainForm from './views/MainForm';

function App() {
  return (
    <div className="App">
      <MainForm data={data} />
    </div>
  );
}

export default App;
