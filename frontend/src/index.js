import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Flujo from './pages/flujo';
import Vehiculo from './pages/vehiculo';
import Persona from './pages/persona';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route index element={<Flujo />} />
        <Route path='/flujo' element={<Flujo />} />
        <Route path='/vehiculo' element={<Vehiculo />} />
        <Route path='/persona' element={<Persona />} />
      </Routes>
    </BrowserRouter>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
