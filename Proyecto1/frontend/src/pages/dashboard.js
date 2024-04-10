import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../components/card'; // Asegúrate de importar tu componente Card aquí
import HeatMapChart from '../components/heatmapchart';
import ComboBox from '../components/combobox';
import '../css/dashboard.css';

const Dashboard = () => {

    const generateData = () => {
        const data = [];
        for (let i = 0; i < 15; i++) {
            const row = [];
            for (let j = 0; j < 15; j++) {
                const randomNumber = Math.floor(Math.random() * 11); // Genera un número aleatorio entre 0 y 10
                //row.push(j);
                row.push(randomNumber);
            }
            data.push(row);
        }
        return data;
    };

    const data = generateData();

    return (
        <div className='Contain'>
            <Container>
                <Row>
                    <Col lg={8} md={12}>
                        <Card title="Heat Map" width="100%" height="85vh">
                            {/* Contenido de la tarjeta grande */}
                            <HeatMapChart data={data} />
                        </Card>
                    </Col>
                    <Col lg={4} md={12}>
                        <Row>
                            <Card title="Room Detail" width="100%" height="45vh">
                                {/* Contenido de la tarjeta pequeña */}
                                <ComboBox
                                    options={['Room 1', 'Room 2', 'Room 3']}
                                    placeholder="Select a room"
                                />
                                <div className='prop'>
                                    <div>
                                        <button id='btnprop'>Time</button>
                                        <button id='btnprop'>{"00:00:00"}</button>
                                    </div>
                                    <div>
                                        <button id='btnprop'>Type</button>
                                        <button id='btnprop'>{"Bathroom"}</button>
                                    </div>
                                    <div>
                                        <button id='btnprop'>State</button>
                                        <button id='btnprop'>{"Occupied"}</button>
                                    </div>
                                </div>

                            </Card>
                        </Row>
                        <Row>
                            <Card title="House Diagram" width="100%" height="38vh">
                                {/* Contenido de la tarjeta pequeña */}

                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
