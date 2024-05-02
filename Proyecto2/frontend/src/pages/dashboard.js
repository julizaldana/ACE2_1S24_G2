import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../components/card';
import '../css/dashboard.css';
import DateComponent from '../components/date';
import Tabla from '../components/tabla';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [time, setTime] = useState("00:00")
    const [logs, setLogs] = useState([])



    // FUNCION PARA OBTENER LAS ALERTAS -----------------------------------------

    useEffect(() => {

        const interval = setInterval(() => {
            fetchAlert();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchAlert = async () => {
        try{
            const response = await fetch('/api/alertas');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.isAlert === true) {
                toast.warn(data.message);
            }

        } catch (error) {
            console.log('Error fetching data: ',error)
        }
    }

    //----------------------------------------------------------------------------

    // FUNCION PARA OBTENER LOS LOGS ---------------------------------------------

    const fetchLogs = async () => {
        try{
            if (startDate === "" && endDate === "") {
                const response = await fetch('/api/logs');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLogs(data);
            }
            else {
                const response = await fetch(`/api/logs?startDate=${startDate}&endDate=${endDate}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLogs(data);
            }

        }
        catch (error) {
            console.log('Error fetching data: ',error)
        }
    };

    const handleStartDate = (value) => {
        setStartDate(value)
    };

    const handleEndDate = (value) => {
        setEndDate(value)
    };

    const header = ['ID', 'FECHA','NTIPO', 'TIPO'];
    //const data = [
    //    { ID: 1, FECHA: '2024-02-16', 'NTIPO' : 1 ,'TIPO': 'Login' },
    //    { ID: 2, FECHA: '2024-02-16', 'NTIPO' : 2,'TIPO': 'Logout' },
        // Agrega más filas según sea necesario
    //];

    return (
        <div className='Contain'>
            <Container>
                <Row>
                    <Col lg={8} md={12}>
                        <Card title="Logs" width="100%" height="85vh">
                            {/* Contenido de la tarjeta grande */}
                            <Tabla header={header} data={logs}>
                            </Tabla>
                        </Card>
                    </Col>
                    <Col lg={4} md={12}>
                        <Row>
                            <Card title="Date" width="100%" height="42vh">
                                {/* Contenido de la tarjeta pequeña */}
                                <div className='params'>
                                    <div className='param'>
                                        <DateComponent label={"Start Date"} value={startDate} onChange={handleStartDate} />
                                    </div>
                                    <div className='param'>
                                        <DateComponent label={"End Date"} value={endDate} onChange={handleEndDate} />
                                    </div>
                                    <div className='param'>
                                        <div className='fechas'>
                                            <button onClick={fetchLogs}>
                                                Historial Logs
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Row>
                        <Row>
                            <Card title="Time" width="100%" height="41vh">
                                {/* Contenido de la tarjeta pequeña */}
                                <div className='prop'>
                                    <div>
                                        <button id='btnprop'>{time}</button>
                                    </div>
                                </div>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
