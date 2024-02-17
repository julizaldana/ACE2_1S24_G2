import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateComponent from '../components/date';
import CardG from '../components/cardg';
import LineChart from '../components/linechart';
import '../css/flujo.css';

const Persona = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (value) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
  };


const data = [12, 19, 3, 5, 2, 3];
const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
const colors = ['#00416A'];

  return (
    <div>
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <div className='fechas'>
              <DateComponent label="Fecha Inicial" value={startDate} onChange={handleStartDateChange} />
              <DateComponent label="Fecha Final" value={endDate} onChange={handleEndDateChange} />
              <button>
                Historial Flujos
              </button>
            </div>
          </Col>
          <Col xs={12} md={8}>
            <CardG>
            <LineChart data={data} labels={labels} colors={colors} title={"Cantidad de personas por dia"}/>
            </CardG>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Persona;

