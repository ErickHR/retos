import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

import Router from './routes/router';
import NavBar from './components/NavBar';

ReactDOM.render(
  <BrowserRouter>
    <div className="container">
        <NavBar />
        <Router />
    </div>
  </BrowserRouter>,
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
