import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '../components/card';
import '../css/dash.css';


function Dash() {
    return (
        <div className='Contain'>
            <Container>
                <Row>
                    <Col><Card title={"Espacios Ocupados"}></Card></Col>
                    <Col><Card title={"Personas por vehículo"}></Card></Col>
                    <Col><Card title={"Vehículos por Rol"}></Card></Col>
                </Row>
                <Row>
                    <Col>c1</Col>
                    <Col>c2</Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dash;
