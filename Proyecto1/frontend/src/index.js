import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import ProcessTree from './pages/historic';
import Header from './components/header';
import './css/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/processtree' element={<ProcessTree />} />
      </Routes>
    </BrowserRouter>
  </div>
);

reportWebVitals();
