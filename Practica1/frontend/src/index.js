import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Flujo from './pages/flujo';
import Vehiculo from './pages/vehiculo';
import Persona from './pages/persona';
import Dash from './pages/dash';
import Header from './components/header';
import './css/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route index element={<Dash />} />
        <Route path='/flujo' element={<Flujo />} />
        <Route path='/vehiculo' element={<Vehiculo />} />
        <Route path='/persona' element={<Persona />} />
        <Route path='/dash' element={<Dash />} />
      </Routes>
    </BrowserRouter>
  </div>
);

reportWebVitals();
