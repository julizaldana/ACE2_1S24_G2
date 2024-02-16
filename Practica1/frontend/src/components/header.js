import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="dash">ACCESSPRO</Navbar.Brand>
                    <Nav className="me-0.25">
                        <Nav.Link href="dash">TABLERO</Nav.Link>
                        <Nav.Link href="flujo">FLUJOS</Nav.Link>
                        <Nav.Link href="vehiculo">VEHICULOS</Nav.Link>
                        <Nav.Link href="persona">PERSONAS</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;