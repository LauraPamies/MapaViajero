// import React from 'react';
import React, { useState, useEffect } from 'react';
import '../CSS/header.css';
import logo from '../images/logo.png';
import user from '../images/User.png';
import { Link, Navigate, useNavigate, useLocation, matchPath } from 'react-router-dom';


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function HeaderComponent() {
    const location = useLocation(); //para saber la localización

      const { pathname } = location;

      //HEADER PARA LA CUENTA INICIADA
      const isCuentaHeaderVisible = pathname === '/presupuesto' || pathname === '/listas' || pathname.startsWith('/itinerario/') || pathname === '/misItinerarios' || pathname === '/favoritos' || pathname === '/subirItinerario';
  


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




    return (


        <Navbar expand="lg" id="headercuenta" className="justify-content-between">
            <Container fluid className="custom-navbar-padding">
                <Navbar.Brand className="d-flex align-items-center">
                    <Link to="/">
                        <img id="logo" src={logo} alt='logo' width={"108"}></img>
                    </Link>
                    <h1 id='titulomapa' className="ms-3 mb-0">MAPA VIAJERO</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="">
                    <Nav className="me-auto mx-auto">
                        <NavDropdown title="Itinerarios" id="itinerarioslink">
                            <NavDropdown.Item href="/listas">Listas</NavDropdown.Item>
                            <NavDropdown.Item href="/mapa">Mapa</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/subirItinerario">Subir itinerario</NavDropdown.Item>
                            <NavDropdown.Item href="/misItinerarios">Mis itinerarios</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Item className="mx-3">
                            <Nav.Link href="/presupuesto" id="presupuestolink">Predecir presupuesto</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="mx-3">
                            <Nav.Link href="/contacto" id="contactolink">Contacto</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="ms-auto">
                        <NavDropdown title={<img src={user} alt='logo' width={"72"} />} id="usuariolink">
                            <NavDropdown.Item href="/favoritos">Favoritos</NavDropdown.Item>
                            <NavDropdown.Item href="/chats">Chats</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/cuenta">Cuenta</NavDropdown.Item>

                            <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>






    );
}

export default HeaderComponent;
