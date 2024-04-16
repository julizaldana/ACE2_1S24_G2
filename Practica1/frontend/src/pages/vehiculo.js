import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateComponent from '../components/date';
import CardG from '../components/cardg';
import VerticalBarChart from '../components/barchart';
import '../css/flujo.css';

const Vehiculo = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  const handleStartDateChange = (value) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
  };

  useEffect(() => {
    // Funcion para obtener los datos del historial de vehiculos
    const fetchVehiculo = async () => {
      try{
        const response = await fetch('http://localhost:5000/vehiculoactual')
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const vehiculoData = await response.json();
        setData(vehiculoData);
        setLabels(vehiculoData.labels);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVehiculo();
  },[]);

  const handleHistorialVehiculosClick = async () => {
    try{
      const response = await fetch('http://localhost:5000/historialvehiculos',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const vehiculoData = await response.json();
      setData(vehiculoData);
      setLabels(vehiculoData.labels);
    }catch (error) {
      console.error(error);
    }
  };

  //const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; // Etiquetas para el eje X
  
  // const data = {
  //   labels: labels,
  //   datasets: [
  //     { 
  //       label: 'Estudiantes', 
  //       data: [20, 15, 30, 25, 35], // Datos para el conjunto de datos de estudiantes
  //       backgroundColor: '#76aee1'  // Color para los datos de estudiantes
  //     },
  //     { 
  //       label: 'Catedráticos', 
  //       data: [10, 12, 8, 15, 20],  // Datos para el conjunto de datos de catedráticos
  //       backgroundColor: '#47d4f5'  // Color para los datos de catedráticos
  //     },
  //     { 
  //       label: 'Trabajadores', 
  //       data: [5, 8, 6, 10, 12],    // Datos para el conjunto de datos de trabajadores
  //       backgroundColor: '#66ecc9'  // Color para los datos de trabajadores
  //     },
  //     { 
  //       label: 'Otros', 
  //       data: [8, 6, 10, 5, 12],     // Datos para el conjunto de datos de otros
  //       backgroundColor: '#e8e279'  // Color para los datos de otros
  //     }
  //   ]
  // };
  
  
  return (
    <div>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <div className='fechas'>
              <DateComponent label="Fecha Inicial" value={startDate} onChange={handleStartDateChange} />
              <DateComponent label="Fecha Final" value={endDate} onChange={handleEndDateChange} />
              <button onClick={handleHistorialVehiculosClick}>
                Historial Vehiculos
              </button>
            </div>
          </Col>
          <Col xs={12} md={8}>
            <CardG>
            <VerticalBarChart data={data} labels={labels} title={"Vehiculos por rol"}/>
            </CardG>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Vehiculo;