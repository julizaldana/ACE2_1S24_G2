import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../components/card'; // Asegúrate de importar tu componente Card aquí

const Dashboard = () => {
    return (
        <div className='Contain'>
            <Container>
                <Row>
                    <Col lg={8} md={12}>
                        <Card title="Heat Map" width="100%" height="85vh">
                            {/* Contenido de la tarjeta grande */}
                        </Card>
                    </Col>
                    <Col lg={4} md={12}>
                        <Card title="Detail" width="100%" height="85vh">
                            {/* Contenido de la tarjeta pequeña */}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;
