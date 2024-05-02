import React from 'react';
import '../css/date.css'; // Importa los estilos CSS

const DateComponent = ({ label, value, onChange }) => {
  return (
    <div className="date-component">
      <label className="date-label">{label}:</label>
      <input 
        className="date-input"
        type="date" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    </div>
  );
};

export default DateComponent;