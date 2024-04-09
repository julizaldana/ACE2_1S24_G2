import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MdSensorOccupied } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import '../css/header.css';


function Header() {
    const location = useLocation();
    
    const isActiveLink = (link) => {
        if (link === '/dashboard' && location.pathname === '/') return 'btnactive';
        return location.pathname === link ? 'btnactive' : 'btn';
    }

    return (
        <>
            <Navbar expand="md" className='navbar'>
                <Container fluid>
                    <Navbar.Brand href="dashboard" className='brand'>
                        <MdSensorOccupied size="1.5em" color="white" style={{ marginRight: '0.5rem' }} />
                        SENSORY LIVING
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto"> {/* Cambié me-auto por ms-auto */}
                            <Nav.Link href="dashboard">
                                <button className={isActiveLink('/dashboard')}>DASHBOARD</button>
                            </Nav.Link>
                            <Nav.Link href="historic">
                                <button className={isActiveLink('/historic')}>HISTORIC</button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
