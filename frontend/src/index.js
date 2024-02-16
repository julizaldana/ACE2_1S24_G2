import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import P_Dashboard from './pages/p_dashboard';
import H_Dashboard from './pages/h_dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route index element={<P_Dashboard />} />
        <Route path='/index' element={<P_Dashboard />} />
        <Route path='/historic' element={<H_Dashboard />} />
      </Routes>
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
