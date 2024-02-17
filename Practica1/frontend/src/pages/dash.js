import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '../components/card';
import CardT from '../components/cardt';
import Tabla from '../components/tabla';
import '../css/dash.css';
import PieChart from '../components/piechart';
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


function Dash() {

    /* 
    JSON : 
    { //Ingresos, pueden ser un arreglo de objetos
        [
        "tipo" : 0
        "ID": 1,
        "FECHA": "2024-02-16",
        "HORA": "10:00",
        "TIPO VEHÍCULO": "Automóvil",
        "ROL VEHÍCULO": "Particular"
        ],
    }

    {//Egresos, pueden ser un arreglo de objetos
        [
        "tipo" : 1
        "ID": 1,
        "FECHA": "2024-02-16",
        "HORA": "10:00",
        "TIPO VEHÍCULO": "Automóvil",
        "ROL VEHÍCULO": "Particular"
        ],
    }
    {
        "ocupados": 12,
        "disponibles": 30
        "personal": 12,
        "mediano": 20,
        "grande": 30
        "ajenos": 12,
        "estudiante": 1,
        "trabajador": 4,
        "catedratico": 6
    }

    const data = [
    { ID: 1, FECHA: '2024-02-16', HORA: '10:00', 'TIPO VEHÍCULO': 'Automóvil', 'ROL VEHÍCULO': 'Particular' },
    { ID: 2, FECHA: '2024-02-16', HORA: '11:00', 'TIPO VEHÍCULO': 'Camión', 'ROL VEHÍCULO': 'Comercial' },
    // Agrega más filas según sea necesario
    ];
    */

    //Consulta de datos al backend
    const [loading, setLoading] = useState(true);
    const [dataIngresos, setDataIngresos] = useState([]);
    const [dataEgresos, setDataEgresos] = useState([]);
    const [dataGraphs, setDataGraphs] = useState({});

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            //Realizar la consulta al backend
            const responseIngresos = await fetch('http://localhost:5000/ingresos');
            const ingresosd = await responseIngresos.json();

            const responseEgresos = await fetch('http://localhost:5000/egresos');
            const egresosd = await responseEgresos.json();

            const responseGraphs = await fetch('http://localhost:5000/graphs');
            const graphsd = await responseGraphs.json();

            //Actualizar el estado de los datos
            setDataIngresos(ingresosd);
            setDataEgresos(egresosd);
            setDataGraphs(graphsd);
            setLoading(false);

        } catch (error) {
            console.error('Error al obtener los datos', error);
        }
    };

    //if (loading) {
    //    return (
    //        <div className='cargar'>
    //            {/* Muestra la animación de carga mientras loading es true */}
    //            <BeatLoader color={'#123abc'} loading={loading} css={override} size={30} />
    //        </div>
    //    );
    //}

    // Renderizar solo si los datos están disponibles
    //if (dataIngresos.length === 0 || dataEgresos.length === 0 || Object.keys(dataGraphs).length === 0) {
    //    return <div>Cargando...</div>;
    //}


    //Datos de la tabla
    const header = ['ID', 'FECHA', 'HORA', 'TIPO VEHÍCULO', 'ROL VEHÍCULO'];

    //Datos de la grafica de espacios ocuapdos
    //const data_ocupados = [dataGraphs.ocupados, dataGraphs.disponibles];
    const data_ocupados = [12, 30];
    const labels_ocupados = ['Ocupados', 'Disponibles'];
    const colors_ocupados = ['#269fbd', '#87f4e8'];

    //Datos de la grafica de personas por vehiculo
    //const data_personas = [dataGraphs.personal, dataGraphs.mediano, dataGraphs.grande];
    const data_personas = [10, 20, 30];
    const labels_personas = ['Personal', 'Mediano', 'Grande'];
    const colors_personas = ['#00c598', '#12b3ab', '#0da9d9'];

    //Datos de la grafica de vehiculos por rol  
    //const data_rol = [dataGraphs.ajenos, dataGraphs.estudiante, dataGraphs.trabajador, dataGraphs.catedratico];
    const data_rol = [10, 3, 6, 5];
    const labels_rol = ['Ajenos', 'Estudiante', 'Trabajador', 'Catedrátrico'];
    const colors_rol = ['#76aee1', '#47d4f5', '#66ecc9', '#e8e279'];
    return (
        <div className='Contain'>
            <Container>
                <Row>
                    <Col>
                        <Card title={"Espacios Ocupados"}>
                            <PieChart data={data_ocupados} labels={labels_ocupados} colors={colors_ocupados} />
                        </Card>
                    </Col>
                    <Col>
                        <Card title={"Personas por vehículo"}>
                            <PieChart data={data_personas} labels={labels_personas} colors={colors_personas} />
                        </Card>
                    </Col>
                    <Col>
                        <Card title={"Vehículos por Rol"}>
                            <PieChart data={data_rol} labels={labels_rol} colors={colors_rol} />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CardT>
                            <Tabla title={"Ingresos"} header={header} data={dataIngresos}>

                            </Tabla>
                        </CardT>
                    </Col>
                    <Col>
                        <CardT>
                            <Tabla title={"Egresos"} header={header} data={dataEgresos}>

                            </Tabla>
                        </CardT>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dash;
