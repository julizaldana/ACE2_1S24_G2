import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/historic.css';
import {Container, Row, Col } from 'react-bootstrap';
import Card from '../components/card';
import HeatMapChart from '../components/heatmapchart';
import DateComponent from '../components/date';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Historic() {
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

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [map, setMap] = useState(mapdata);
    const [room, setRoom] = useState(null);

    const handleStartDate = (value) => {
        setStartDate(value)
    };

    const handleEndDate = (value) => {
        setEndDate(value)
    };

    const handleRoom = (roomNumber) => {        
        if (startDate && endDate) {
            setRoom(roomNumber)
            fetch(`/api/historic?room=${roomNumber}&start=${startDate}&end=${endDate}`)
                .then(response => response.json())
                .then(data => {
                    setMap(data.map)
                })
                .catch(error => console.error('Error fetching data:', error));
        }
        else {
            toast.warn("Please select a start and end date");
        }
    };


    
    return (
        <div className='Contain'>
            <Container>
                <Row>
                    <Col lg={8} md={12}>
                        <Card title={"Historic Data " + (room ? `Room ${room}` : "")} width={"100%"} height={"85vh"}>
                            <HeatMapChart data={map}/>
                        </Card>
                    </Col>
                    <Col lg={4} md={12}>
                        <Card title={"Parameters"} width={"100%"} height={"85vh"}>
                            <div className='params'>
                                <div className='param'>
                                    <DateComponent label={"Start Date"} value={startDate} onChange={handleStartDate}/>
                                </div>
                                <div className='param'>
                                    <DateComponent label={"End Date"} value={endDate} onChange={handleEndDate}/>
                                </div>
                                <label className="date-label">{"Choose a Room"}:</label>
                                <div className='house'>
                                <div className='room1'>
                                        <button id='btnr' onClick={() => handleRoom(1)}>ROOM 1</button>
                                    </div>
                                    <div className='room'>
                                        <button id='btnr' onClick={() => handleRoom(2)}>ROOM 2</button>
                                        <button id='btnr' onClick={() => handleRoom(3)}>ROOM 3</button>
                                    </div>
                                    <div className='room'>
                                        <button id='btnr' onClick={() => handleRoom(4)}>ROOM 4</button>
                                        <button id='btnr' onClick={() => handleRoom(5)}>ROOM 5</button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ToastContainer/>
        </div>
    );
}

export default Historic;
