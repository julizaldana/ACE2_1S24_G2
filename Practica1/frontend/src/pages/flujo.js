import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateComponent from '../components/date';
import CardG from '../components/cardg';
import LineChart from '../components/linechart';
import '../css/flujo.css';

const Flujo = () => {
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
    // Funcion para obtener los datos del flujo
    const fetchFlujo = async () => {
      try{
        const response = await fetch('http://localhost:5000/flujoactual')
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const flujoData = await response.json();
        setData(flujoData.data);
        setLabels(flujoData.labels);

      } catch (error) {
        console.error(error);
      }
    };
    fetchFlujo();
  },[]);

  const handleHistorialFlujosClick = async () => {
    try{
      const response = await fetch('http://localhost:5000/historialflujos',{
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
      const historialFlujosData = await response.json();
      // Actualizar los datos, etiquetas y colores
      setData(historialFlujosData.data);
      setLabels(historialFlujosData.labels);
    } catch (error) {
      console.error(error);
    }
  };


//const data = [12, 19, 3, 5, 2, 3];
//const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
const colors = ['#00416A'];

  return (
    <div>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <div className='fechas'>
              <DateComponent label="Fecha Inicial" value={startDate} onChange={handleStartDateChange} />
              <DateComponent label="Fecha Final" value={endDate} onChange={handleEndDateChange} />
              <button onClick={handleHistorialFlujosClick}>
                Historial Flujos
              </button>
            </div>
          </Col>
          <Col xs={12} md={8}>
            <CardG>
            <LineChart data={data} labels={labels} colors={colors} title={"Ingresos vs Egresos"}/>
            </CardG>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Flujo;
