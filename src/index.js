import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
// import App from "../src-no-context/Components/App"
import { QuizeProvider } from './context/QuizContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuizeProvider>
      <App />
    </QuizeProvider>
  </React.StrictMode>
);


