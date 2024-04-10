import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../components/card'; // Asegúrate de importar tu componente Card aquí
import HeatMapChart from '../components/heatmapchart';
import '../css/dashboard.css';

const Dashboard = () => {

    const generateData = () => {
        const data = [];
        for (let i = 0; i < 15; i++) {
            const row = [];
            for (let j = 0; j < 15; j++) {
                const randomNumber = Math.floor(Math.random() * 99); // Genera un número aleatorio entre 0 y 10
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
                            <Card title="House Diagram" width="100%" height="42vh">
                                {/* Contenido de la tarjeta pequeña */}
                                {/* img src={diagram} alt="House Diagram" style={{ width: '100%', height: '30vh' }} />*/}
                                <div className='house'>
                                    <div className='room1'>
                                        <button id='btnr'>ROOM 1</button>
                                    </div>
                                    <div className='room'>
                                        <button id='btnr'>ROOM 2</button>
                                        <button id='btnr'>ROOM 3</button>
                                    </div>
                                    <div className='room'>
                                        <button id='btnr'>ROOM 4</button>
                                        <button id='btnr'>ROOM 5</button>
                                    </div>
                                </div>
                            </Card>
                        </Row>
                        <Row>
                            <Card title="Room Detail" width="100%" height="41vh">
                                {/* Contenido de la tarjeta pequeña */}
                                <div className='prop'>
                                    <div>
                                        <button id='btntitle'>Room</button>
                                        <button id='btnprop'>{"N"}</button>
                                    </div>
                                    <div>
                                        <button id='btntitle'>Time</button>
                                        <button id='btnprop'>{"00:00:00"}</button>
                                    </div>
                                    <div>
                                        <button id='btntitle'>Type</button>
                                        <button id='btnprop'>{"Bathroom"}</button>
                                    </div>
                                    <div>
                                        <button id='btntitle'>State</button>
                                        <button id='btnprop'>{"Occupied"}</button>
                                    </div>
                                </div>

                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
