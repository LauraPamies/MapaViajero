import React from 'react';
import '../CSS/landing.css';
import imgcanoa from '../images/img-canoa.png';
// import imgmapa from '../images/img-mapa.png';
// import imgpatio from '../images/img-patio.png';
// import avion from '../images/avion.png';
import imagenes from '../images/imagenes.png';
import flecha from '../images/flecha-icon.png';
import { Link } from 'react-router-dom';



const LandingComponent = () => {
    return (
        <div className='Landing'>
            <div className='bloque'>
                <div className='textos'>
                    <h1>DESCUBRE,</h1>
                    <div id='textosjuntos'>
                        <h1 id='textodistinto'>COMPARTE</h1><h1>,EXPLORA</h1>
                    </div>
                    <h3>Juntos trazamos el mapa de tus aventuras</h3>
                </div>
                <div className='botoneslanding'>
                    <Link to="/registro"><button id='empieza'>Empieza</button></Link>
                    <img src={flecha} alt='logo' width={"20"}></img>
                    <a href="/contacto" id="info">Más info</a>
                </div>
            </div>

            <div className='bloque' >
                <img id='imagenes' src={imagenes} alt='logo' ></img>

            </div>
            <div id='div2'><img src={imgcanoa} alt='logo' width={"350"} /></div>




        </div>
    );
}

export default LandingComponent;
