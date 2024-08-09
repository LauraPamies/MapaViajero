import '../CSS/footer.css';
import { useNavigate, useLocation } from 'react-router-dom';

import insta from '../images/instadark.png';
import twitter from '../images/twitterdark.png';
import facebook from '../images/fbdark.png';

function HeaderComponent() {
    const location = useLocation(); //para saber la localización

    const { pathname } = location;

    //HEADER PARA LA CUENTA INICIADA
    const isCuentaFooterVisible = pathname === '/presupuesto' || pathname === '/listas' || pathname.startsWith('/itinerario/') || pathname === '/misItinerarios' || pathname === '/favoritos' || pathname === '/subirItinerario' || pathname.startsWith('/mapa') ;

    return (
        //DEVUELVE UN TIPO DE HEADER DISTINTO DEPENDIENDO DE LA UBICACIÓN DONDE ESTEMOS
        <header>
            {location.pathname === '/' && <NoFooter />}
            {location.pathname === '/login' && <NoFooter />}
            {isCuentaFooterVisible && <CuentaFooter />}
        </header>
    );

}


function NoFooter() {
    return (
        <div>

        </div>
    );
}

function CuentaFooter() {
    return (
        <div id='contenedor-footer'>
            <div id='sup-footer'>
                <div className='listas-footer'>
                    <p>Nuestra empresa</p>
                    <ul>
                        <li>¿Quienes somos?</li>
                        <li>Políticas de seguridad</li>
                        <li>Mejoras futuras</li>
                    </ul>
                </div>

                <div className='listas-footer'>
                    <p>¿Te ayudamos?</p>
                    <ul>
                        <li>Contacto</li>
                        <li>Preguntas frecuentes</li>
                        <li>Plantilla itinerario</li>
                        <li>Pagos</li>
                        <li>Quitar anuncios</li>
                    </ul>
                </div>

                <div className='listas-footer'>
                    <p>Síguenos en</p>
                    <div id='redes-dark'>
                        <img className="iconredes" src={facebook} alt='logo' width={"45px"}></img>
                        <img className="iconredes" src={twitter} alt='logo' width={"45px"}></img>
                        <img className="iconredes" src={insta} alt='logo' width={"45px"}></img>
                    </div>
                </div>
            </div>
            <div id='inferior-footer'>
                <ul id='listainferior'>
                    <li>Privacidad</li>
                    <li>Términos y condiciones</li>
                    <li>Aviso legal</li>
                    <li>©2024 MAPAVIAJERO</li>
                </ul>
            </div>
        </div>

    );
}

export default HeaderComponent;
