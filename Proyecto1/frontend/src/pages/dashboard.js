import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../components/card';
import HeatMapChart from '../components/heatmapchart';
import '../css/dashboard.css';

const Dashboard = () => {

    const mapdata = [
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
        [3, 3, 3, 3, 3, 3, 9, 9, 9, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 9, 9, 9, 9, 9, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 9, 9, 9, 9, 9, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 9, 9, 9, 9, 9, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 9, 9, 9, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 9, 9, 9, 9, 9, 9, 9, 3, 3, 3, 3],
        [3, 3, 3, 9, 9, 9, 9, 9, 9, 9, 9, 9, 3, 3, 3],
        [3, 3, 3, 9, 9, 9, 9, 9, 9, 9, 9, 9, 3, 3, 3],
        [3, 3, 3, 9, 9, 9, 9, 9, 9, 9, 9, 9, 3, 3, 3],
        [3, 3, 3, 9, 9, 9, 9, 9, 9, 9, 9, 9, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1]
    ];


    // Constantes para consultar al backend
    const [nroom, setNroom] = useState(null);
    const [time, setTime] = useState("");
    const [type, setType] = useState("");
    const [state, setState] = useState("");
    const [map, setMap] = useState(mapdata);

    //Funcion para manejar las habitaciones
    const handleRoom = (roomNumber, roomType) => {
        // Actualizar el numero de la habitacion
        setNroom(roomNumber);
        // Actualizar el tipo de la habitacion
        setType(roomType);
        // Iniciar la consulta al backend cada 500ms
        const timer = setInterval(() => {
            fetchBackendData(roomNumber);
            startTimer();
        }, 500);

        // Funcion para inciar un contador de tiempo
        const startTimer = () => {
            // Obtener la hora actual y formatearla
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const currentTime = `${hours}:${minutes}:${seconds}`;
            setTime(currentTime);
        };

        // Limpiar el intervalo cuando sea necesario (por ejemplo, cuando se desmonte el componente o se llame a otra función)
        return () => clearInterval(timer);
    };


    // Función para consultar al backend
    const fetchBackendData = (roomNumber) => {
        fetch(`http://localhost:8000/consult?room=${roomNumber}`)
            .then(response => response.json())
            .then(data => {
                // Actualizar el mapa de calor
                setMap(data.map);
                // Actualizar el estado o realizar acciones según la respuesta del backend
                setState(data.state);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <div className='Contain'>
            <Container>
                <Row>
                    <Col lg={8} md={12}>
                        <Card title="Heat Map" width="100%" height="85vh">
                            {/* Contenido de la tarjeta grande */}
                            <HeatMapChart data={map}/>
                        </Card>
                    </Col>
                    <Col lg={4} md={12}>
                        <Row>
                            <Card title="House Diagram" width="100%" height="42vh">
                                {/* Contenido de la tarjeta pequeña */}
                                <div className='house'>
                                    <div className='room1'>
                                        <button id='btnr' onClick={() => handleRoom(1, 'Living Room')}>ROOM 1</button>
                                    </div>
                                    <div className='room'>
                                        <button id='btnr' onClick={() => handleRoom(2, 'Dining Room')}>ROOM 2</button>
                                        <button id='btnr' onClick={() => handleRoom(3, 'Kitchen')}>ROOM 3</button>
                                    </div>
                                    <div className='room'>
                                        <button id='btnr' onClick={() => handleRoom(4, 'Bedroom')}>ROOM 4</button>
                                        <button id='btnr' onClick={() => handleRoom(5, 'Bathroom')}>ROOM 5</button>
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
                                        <button id='btnprop'>{nroom}</button>
                                    </div>
                                    <div>
                                        <button id='btntitle'>Time</button>
                                        <button id='btnprop'>{time}</button>
                                    </div>
                                    <div>
                                        <button id='btntitle'>Type</button>
                                        <button id='btnprop'>{type}</button>
                                    </div>
                                    <div>
                                        <button id='btntitle'>State</button>
                                        <button id='btnprop'>{state}</button>
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
