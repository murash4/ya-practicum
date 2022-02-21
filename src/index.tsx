import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'simplebar/dist/simplebar.min.css'
import './assets/css/simplebar.css'
import App from './components/app'
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
