// import React from 'react';
import React from 'react';
import '../CSS/header.css';
import logo from '../images/logo.png';
import user from '../images/User.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


function HeaderComponent() {
    const location = useLocation(); //para saber la localización

    const { pathname } = location;

    //HEADER PARA LA CUENTA INICIADA
    const isCuentaHeaderVisible = pathname === '/presupuesto' || pathname === '/listas' || pathname.startsWith('/itinerario/') || pathname === '/MisItinerarios' || pathname === '/misItinerarios' || pathname === '/favoritos' || pathname === '/subirItinerario' || pathname.startsWith('/mapa');



    return (
        //DEVUELVE UN TIPO DE HEADER DISTINTO DEPENDIENDO DE LA UBICACIÓN DONDE ESTEMOS
        <header>
            {location.pathname === '/' && <LandingHeader />}
            {location.pathname === '/login' && <LoginHeader />}
            {isCuentaHeaderVisible && <CuentaHeader />}
        </header>
    );



}

function LandingHeader() {
    return (

        <Navbar expand="lg" className="justify-content-between">
            <Container fluid className="custom-navbar-padding">
                <Navbar.Brand className="d-flex align-items-center">
                    <Link to="/">
                        <img id="logo" src={logo} alt='logo' width={"108"}></img>
                    </Link>
                    <h1 id='titulomapa' className="ms-3 mb-0">MAPA VIAJERO</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav className="ms-auto">
                        <Nav.Link href="/login" id="login">Inicio sesión</Nav.Link>
                        <Nav.Link href="/registro" id='registro'>Registro</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function LoginHeader() {
    return (
        <div>

        </div>
    );
}

function CuentaHeader() {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Limpiar los datos del usuario del localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isLoggedIn');
        // Redirigir al usuario a la página de inicio de sesión
        navigate("/login");

    };

    const handleFavoritosClick = () => {
        navigate('/favoritos'); // Navega a la ruta '/favoritos'
    };


    return (


        <Navbar expand="lg" id="headercuenta" className="justify-content-between">
            <Container fluid className="custom-navbar-padding">
                <Navbar.Brand className="d-flex align-items-center">
                    <Link to="/listas">
                        <img id="logo" src={logo} alt='logo' width={"108"}></img>
                    </Link>
                    <h1 id='titulomapa' className="ms-3 mb-0">MAPA VIAJERO</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="">
                    <Nav className="me-auto mx-auto">
                        <NavDropdown title="Itinerarios" id="itinerarioslink">
                            <NavDropdown.Item href="/listas">Buscar</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/subirItinerario">Subir itinerario</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Item className="mx-3">
                            <Nav.Link href="/presupuesto" id="presupuestolink">Predecir presupuesto</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="mx-3">
                            <Nav.Link id="presupuestolink">Contacto</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="ms-auto">

                        <NavDropdown.Item href="/favoritos" className="icon-link">
                                <FontAwesomeIcon icon={faHeart} className="icon" />
                        </NavDropdown.Item>


                        <NavDropdown title={<img src={user} alt='logo' width={"72"} />} id="usuariolink">
                            <NavDropdown.Item >Cuenta</NavDropdown.Item>
                            <NavDropdown.Item href="/MisItinerarios">Mis itinerarios</NavDropdown.Item>
                            <NavDropdown.Divider />

                            <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>






    );
}

export default HeaderComponent;
