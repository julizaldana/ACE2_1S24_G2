import React from 'react';
import Table from 'react-bootstrap/Table';
import '../css/tabla.css'; // Importa tus estilos CSS personalizados

function Tabla({ header, data }) {
  return (
    <div className="tabla-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            {header.map((columnHeader, index) => (
              <th key={index}>{columnHeader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? ( // Verifica si data existe y no está vacío
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {header.map((columnHeader, colIndex) => (
                  <td key={colIndex}>{row[columnHeader]}</td>
                ))}
              </tr>
            ))
          ) : ( // Si no hay datos, muestra una fila de celdas vacías
            <tr>
              <td colSpan={header.length}>No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Tabla;