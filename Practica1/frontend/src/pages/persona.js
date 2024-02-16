import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Persona = () => {
  return (
    <div>
      <h1>Persona</h1>
      <Container>
        <Row>
          <Col xs={6} md={4}>c1</Col>
          <Col xs={12} md={8}>c2</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Persona;
