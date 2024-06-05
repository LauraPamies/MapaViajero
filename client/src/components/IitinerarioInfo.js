import React, { useEffect, useState } from 'react';
import axios from "axios";
import publi_hori from '../images/publi_horizontal.png';
import publi from '../images/Publi.png';
import '../CSS/itinerarioInfo.css';
import chat from '../images/chat_icon.png';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';





const IitinerarioInfo = () => {
    const { id } = useParams(); //Accede a los parámetros de la url
    const [itinerario, setItinerario] = useState(null);
    const [textosItinerario, setTextoItinerario] = useState([]);

    const navigate = useNavigate();


    axios.defaults.baseURL = 'http://localhost:3050';

    useEffect(() => {

        if (localStorage.getItem('isLoggedIn') !== 'true') { //SI NO ESTÁ LOGUEADO
            navigate("/login");
        } else {
            //SI ESTÁ LOGUEADO
            console.log(localStorage.getItem('userId'));
            console.log(localStorage.getItem('userName'));
            console.log(localStorage.getItem('userEmail'));
            console.log(localStorage.getItem('isLoggedIn'));

        }

        axios.get(`/itinerario/${id}`)
            .then(response => {
                setItinerario(response.data);

                axios.get(`/textosItinerarioslimite/${id}`)
                    .then(response => {
                        console.log(response.data);
                        setTextoItinerario(response.data);
                    })
                    .catch(error => {
                        console.error('Error mostrando itinerario:', error);
                    });
            })
            .catch(error => {
                console.error('Error mostrando itinerario:', error);
            });
    }, [id]);



    if (!itinerario) {
        return <div>Cargando...</div>;
    }

    return (
        <div className='itinerariosdiv'>
            <div className='publicidad1'>
                <img src={publi} alt='publi'></img>
            </div>

            <div className='infoItinerario'>
                <div id='resumen-chat'>
                    <div className="itinerario-card">
                        <p id='titulo'>{itinerario.titulo}</p>
                        <p id='personas_dias'>{itinerario.dias} días</p>
                        <p id='personas_dias'>{itinerario.personas} personas</p>
                        <p className='itinerario-precio'>{itinerario.precio}€</p>
                    </div>


                    <img id="chat" src={chat} alt='chat'></img>
                </div>



                <Link to=""><button id='empieza'>Descargar</button></Link>


                <div className="textos-container">
                    {textosItinerario.map((texto, index) => (
                        <div key={texto.num_dia} className="texto-card">

                            <h2 id='titulos_dia'>{texto.num_dia} - {texto.titulo_dia}</h2>
                            <p>{texto.texto_dia} días</p>

                        </div>
                    ))}
                </div>

                <img src={publi_hori} alt='publi' style={{ filter: 'blur(3px)' }}></img>
            </div>
            <div className='publicidad2'>
                <img src={publi} alt='publi'></img>

            </div>

        </div>



    );
}

export default IitinerarioInfo;
