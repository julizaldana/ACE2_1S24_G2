import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaCarTunnel} from 'react-icons/fa6';
import '../css/header.css';

function Header() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <FaCarTunnel size="2em" color="white" />
                <Container fluid>
                    <Navbar.Brand href="dash">ACCESSPRO</Navbar.Brand>
                    <Nav className="me-0.25">
                        <Nav.Link href="dash">
                            <button className="btn">TABLERO</button>
                        </Nav.Link>
                        <Nav.Link href="flujo">
                            <button className="btn">FLUJOS</button>
                        </Nav.Link>
                        <Nav.Link href="vehiculo">
                            <button className="btn">VEHÍCULOS</button>
                        </Nav.Link>
                        <Nav.Link href="persona">
                            <button className="btn">PERSONAS</button>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;